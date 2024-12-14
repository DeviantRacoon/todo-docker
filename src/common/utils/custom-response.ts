export default function customResponse (data: any, statusCode: number) {
    return {
        ok: false,
        statusCode,
        message,
    };
}