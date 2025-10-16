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
}