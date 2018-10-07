import * as React from "React";

export module Encoding {
    export interface IEncodingVigenere {
        Encrypt($string: string): string
    }

    export class EncodingVigenere implements IEncodingVigenere {
        private $keyTable = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        private createCode(length: number): string {
            var $code = '';
            var $temp = 0;
            for (var $i = 0; $i < length; $i++) {
                $temp = Math.floor(Math.random() * (26 - 1) + 1);
                if ($i === 0)
                    $code += $temp;
                else
                    $code += '#' + $temp;
            }
            return $code;
        };

        private getKey($code: string): string {
            var $key = '';
            var $arr = [];
            $arr = $code.split('#').map(Number);
            var $length = $arr.length;
            for (var $i = 0; $i < $length; $i++) {
                $key += this.$keyTable[$arr[$i]];
            }

            return $key;
        };

        private createKeyCode(length: number): string {
            var $key = ''; 
            var $code = '';
            try {
                $code = this.createCode(length);
                $key = this.getKey($code);
            } catch ($err) {
                // TODO Auto-generated catch block	
                return $err;
            }

            return $key;
        };

        private toUnsignWithSpace(str: string): string {
            if (str !== undefined) {
                str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                str = str.replace(/đ/g, "d");
                str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
                str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
                str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
                str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
                str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
                str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
                str = str.replace(/Đ/g, "D");
                str = str.trim();
            }
            else {
                str = '';
            }

            return str;
        };

        public Encrypt($string: string): string {
            $string = this.toUnsignWithSpace($string);
            var $length = $string.length;
            var $keyStr = this.createKeyCode($length);
            var $key = $keyStr.split('');
            var $y = $key.length;
            var $c = '';
            var $n = 0;
            var $kt = 0;
            var $temp = 0;
            for (var $i = 0; $i < $length; $i++) {
                if ($string[$i] == $string[$i].toUpperCase()) {
                    $n = ($string[$i]).charCodeAt(0) - ('A').charCodeAt(0);
                    for (let $j = $i; $j < $y; $j++) {
                        if ($string[$j] < 'A' || $string[$j] > 'Z') {
                            $c += $string[$i];
                            break;
                        }
                        if ($j < $length) {
                            if ((($key[$j]).charCodeAt(0) + $n) > 90) {
                                $temp = 90 - ($key[$j].charCodeAt(0));
                                $n -= $temp;
                                $c += String.fromCharCode(('A').charCodeAt(0) + $n - 1);
                                break;
                            }
                            else {
                                $kt = ($key[$j]).charCodeAt(0) + $n;
                                $c += String.fromCharCode($kt);
                                break;
                            }
                        }
                        else if ($j >= $length)
                            break;
                    }
                    if ($i >= $y) {
                        $c += $string[$i];
                    }
                }
                else {
                    $n = ($string[$i]).charCodeAt(0) - ('a').charCodeAt(0);
                    for (let $j = $i; $j < $y; $j++) {
                        if ($string[$j] < 'a' || $string[$j] > 'z') {
                            $c += $string[$i];
                            break;
                        }
                        if ($j < $length) {
                            $key[$j] = $key[$j].toLowerCase();
                            if ((($key[$j]).charCodeAt(0) + $n) > 122) {
                                $temp = 122 - ($key[$j].charCodeAt(0));
                                $n -= $temp;
                                $c += String.fromCharCode(('a').charCodeAt(0) + $n - 1);
                                break;
                            }
                            else {
                                $kt = ($key[$j]).charCodeAt(0) + $n;
                                $c += String.fromCharCode($kt);
                                break;
                            }
                        }
                        else if ($j >= $length)
                            break;
                    }
                    if ($i >= $y) {
                        $c += $string[$i];
                    }
                }
            }

            $keyStr = $key.join('');
            return $c + $keyStr;
        }
    }
}