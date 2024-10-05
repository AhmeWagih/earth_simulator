uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;
uniform vec3 uOceanColor;  // New uniform for ocean color

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(5.0);

    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);

    // ATMOSPHERE
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    
    // Water Effect
    float waterMix = smoothstep(-1.0, 0.0, normal.y);  // Detect surfaces facing upwards (ocean/sea)
    vec3 oceanReflection = mix(atmosphereColor, uOceanColor, waterMix);  // Reflect the sky on water
    color += oceanReflection;

    // EDGE Alpha
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);
    float dayAlpha = smoothstep(-0.5, 0.0, sunOrientation);
    float alpha = edgeAlpha * dayAlpha;

    // Final color with alpha blending
    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
