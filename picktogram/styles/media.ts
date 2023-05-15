const breakpoints = [576, 768, 992, 1200, 1800];
export const mediaQuery = breakpoints.map((bp) => `@media screen and (min-width : ${bp}px)`);