import construct = Reflect.construct;
export enum SaverOrientation {
    HORIZONTAL,
    VERTICAL,
    DIAGONAL_NW_SE,
    DIAGONAL_SW_NE,
    DIAGONAL_NE_SW,
    DIAGONAL_SE_NW,
    STATIC
}

export enum SaverAnimations {
    FROM_N_SLIDE,
    FROM_S_SLIDE,
    FROM_W_SLIDE,
    FROM_E_SLIDE,
    TO_N_SLIDE,
    TO_S_SLIDE,
    TO_W_SLIDE,
    TO_E_SLIDE,
    SCALE_IN,
    SCALE_OUT,
    FADE_IN,
    FADE_OUT,
    FRAMES
}

export enum SaverTemplates {
    NONE,
    CUSTOM,
    V_N_FADE_BIG_SLIDER_TEMPLATE,
    V_S_FADE_BIG_SLIDER_TEMPLATE,
    H_W_FADE_BIG_SLIDER_TEMPLATE,
    H_E_FADE_BIG_SLIDER_TEMPLATE,
    H_FADE_SLIDER_TEMPLATE,
    V_FADE_SLIDER_TEMPLATE
}