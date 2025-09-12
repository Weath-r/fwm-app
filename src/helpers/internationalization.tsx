export function calculateActiveClass(pathname: string, elementPathName: string, language: string) {
    if (elementPathName === "") {
        return pathname === `/${language}`;
    } else {
        return pathname === `/${language}/${elementPathName}`;
    }
}
