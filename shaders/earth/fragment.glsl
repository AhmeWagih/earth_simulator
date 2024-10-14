uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform sampler2D uDroughtTexture;
uniform sampler2D uForestTexture;
uniform sampler2D uSeaLevelTexture;
uniform float uAmountOfClouds;
uniform float uDrought;
uniform float uForest;
uniform float uSeaLevel;
uniform vec3 uSunDirection;
uniform vec3 uTime;
uniform vec3 uDroughtColor;
uniform vec3 uForestColor;
uniform vec3 uSeaLevelColor;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;
uniform vec3 uCloudColor; // Added cloud color uniform

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    // Original sun and day/night calculation...
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);
    float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color = mix(nightColor, dayColor, dayMix);

    // Cloud Coverage (existing code)...
    vec2 specularCloudColor = texture(uSpecularCloudsTexture, vUv).rg;
    float cloudsMix = smoothstep(uAmountOfClouds, 1.0, specularCloudColor.g);
    cloudsMix *= dayMix;
    color = mix(color, uCloudColor, cloudsMix);

    // Drought Effect
    float droughtEffect = texture(uDroughtTexture, vUv).r * uDrought;
    droughtEffect *= dayMix;
    color = mix(color, uDroughtColor, droughtEffect);

    // Forest Coverage Effect
    float forestEffect = texture(uForestTexture, vUv).g * uForest;
    forestEffect *= dayMix;
    color = mix(color, uForestColor, forestEffect);

    // Sea Level Effect
    float seaLevelEffect = texture(uSeaLevelTexture, vUv).b * uSeaLevel;
    seaLevelEffect *=dayMix;
    color = mix(color, uSeaLevelColor, seaLevelEffect);

    // Apply atmosphere and other existing effects...
    // Atmosphere...
    float atmosphereDayMix = smoothstep(- 0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 4.0);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

    // Specular reflection (existing)...
    vec3 reflection = reflect(- uSunDirection, normal);
    float specular = - dot(reflection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 30.0);
    specular *= specularCloudColor.r;
    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;

    // Final color output...
    gl_FragColor = vec4(color, 1.0);

    // Tone mapping...
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
