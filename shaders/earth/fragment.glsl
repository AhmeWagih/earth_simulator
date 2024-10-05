uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform float uAmountOfClouds;
uniform vec3 uSunDirection;
uniform vec3 uTime;

uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;
uniform vec3 uCloudColor; // Added cloud color uniform

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);

    // Day / night texture color
    float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    
    // Map the sun orientation to the day/night texture
    color = mix(nightColor, dayColor, dayMix);

    // CLOUDS
    // Pick the specular color from the clouds texture, using the rg channels
    vec2 specularCloudColor = texture(uSpecularCloudsTexture, vUv).rg;

    // Mix the color with tinted clouds using uCloudColor
    float cloudsMix = smoothstep(uAmountOfClouds, 1.0, specularCloudColor.g);
    cloudsMix *= dayMix; // Hide clouds on the dark side of the planet
    color = mix(color, uCloudColor, cloudsMix); // Apply cloud color here

    // ATMOSPHERE
    // Remap the sunOrientation using a smoothstep similar to dayMix
    float atmosphereDayMix = smoothstep(- 0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);

    // Fresnel effect (atmosphere more visible on the edges)
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 4.0); // Push fresnel on the edges

    // Apply the atmosphere effect with fresnel and atmosphereDayMix
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

    // REFLECTION OF SUN
    vec3 reflection = reflect(- uSunDirection, normal);
    float specular = - dot(reflection, viewDirection);
    
    // Clamp and adjust specular reflection
    specular = max(specular, 0.0);
    specular = pow(specular, 30.0);
    specular *= specularCloudColor.r; // Remove reflection on land

    // Apply fresnel to specular reflection color
    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;

    // Final color
    gl_FragColor = vec4(color, 1.0);

    // Tone mapping and color space handling
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
