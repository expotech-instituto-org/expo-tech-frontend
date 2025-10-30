declare module '@mui/icons-material/*' {
    import { SvgIconProps } from '@mui/material/SvgIcon';
    import { ComponentType } from 'react';

    const Icon: ComponentType<SvgIconProps>;
    export default Icon;
}

declare module '@mui/icons-material' {
    import { SvgIconProps } from '@mui/material/SvgIcon';
    import { ComponentType } from 'react';

    export const Visibility: ComponentType<SvgIconProps>;
    export const VisibilityOff: ComponentType<SvgIconProps>;
    export const Favorite: ComponentType<SvgIconProps>;
    export const FavoriteBorder: ComponentType<SvgIconProps>;
    export const Grade: ComponentType<SvgIconProps>;
    export const MapOutlined: ComponentType<SvgIconProps>;
    export const QrCodeScanner: ComponentType<SvgIconProps>;
    export const Search: ComponentType<SvgIconProps>;
    export const FormatListBulleted: ComponentType<SvgIconProps>;
    export const Star: ComponentType<SvgIconProps>;
    
}