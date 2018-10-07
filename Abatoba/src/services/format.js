const formatMoney = function (n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? ( c !== 'USD' ? c : 2) : 0;
    d = d === undefined ? "," : d;
    t = t === undefined ? "." : t;
    let s = n < 0 ? "-" : "";
    let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    let j;
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

const currencySymbol = function (code) {
    switch (code) {
        case 'VND':
        case 'VNĐ':
            return 'đ';
        case 'USD':
            return '$'
    }
    return code;
};

export {
    formatMoney,
    currencySymbol
}

