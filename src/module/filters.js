
function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
}

export function dateTimeView (value) {

    if (!value) return '';

    try {

        var date = new Date(value);

        return date.getUTCFullYear() +
            '-' + pad(date.getUTCMonth() + 1) +
            '-' + pad(date.getUTCDate()) +
            ' ' + pad(date.getUTCHours()) +
            ':' + pad(date.getUTCMinutes()) +
            ':' + pad(date.getUTCSeconds());

    } catch (error) {
        return ''
    }
}

