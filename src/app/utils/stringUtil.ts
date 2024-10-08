export class StringUtils {
    static  isEmpty(string: any | string | String): boolean {
        if (string == "" || string == null || string == undefined) {
            return true;
        }
        return false;
    }
}