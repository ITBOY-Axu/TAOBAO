// !function () {
//     const jiekouinput = document.querySelector('.searchInput');
//     const jiekouUl = document.querySelector('.searchUl');
//     function taobao(data) {
//         console.log(data);
//         let taobaoarr = data.result
//         let str = '';
//         if (taobaoarr.length > 10) {
//             for (let i = 0; i < 10; i++) {
//                 str += `<li><a href="https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=${taobaoarr[i]}&suggest=0_1&_input_charset=utf-8&wq=la&suggest_query=la&source=suggest">${taobaoarr[i]}</a></li>`
//             }
//         }
//         else {
//             for (let i = 0; i < taobaoarr.length; i++) {
//                 str += `<li><a href="https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=${taobaoarr[i]}&suggest=0_1&_input_charset=utf-8&wq=la&suggest_query=la&source=suggest">${taobaoarr[i]}</a></li>`
//             }
//         }
//         jiekouUl.innerHTML = str;
//     }
//     jiekouinput.oninput = function () {
//         // console.log(this);
//         if (this.value != '') {

//             let cscript = document.createElement('script');
//             cscript.src = 'https:suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1569402939975_317&callback=taobao&k=1&area=c2c&bucketid=15'
//             document.body.appendChild(cscript);

//         }
//         else {
//             jiekouUl.innerHTML = '';
//         }

//     }

// }()
//         this.jiekouUl = $('.searchUl');

















class jiekou {
    constructor() {
        this.jiekouinput = $('.searchInput');
        this.jiekouUl = $('.searchUl');
        // 
    }
    init() {
        let _this = this;


        // console.log(_this.jiekouinput)
        this.jiekouinput.on('input', function () {

            if (this.value != '') {

                let cscript = document.createElement('script');
                cscript.src = 'https:suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1569402939975_317&callback=taobao&k=1&area=c2c&bucketid=15'
                document.body.appendChild(cscript);

            }
            else {
                _this.jiekouUl.innerHTML = '';
            }

        })
        return function taobao(data) {
            let taobaoarr = data.result;
            console.log($taobaoarr.length);
            let str = '';
            if (taobaoarr.length > 10) {
                for (let i = 0; i < 10; i++) {
                    str += `<li><a href="https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=${taobaoarr[i]}&suggest=0_1&_input_charset=utf-8&wq=la&suggest_query=la&source=suggest">${taobaoarr[i]}</a></li>`
                }
            }
            else {
                for (let i = 0; i < taobaoarr.length; i++) {
                    str += `<li><a href="https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=${taobaoarr[i]}&suggest=0_1&_input_charset=utf-8&wq=la&suggest_query=la&source=suggest">${taobaoarr[i]}</a></li>`
                }
            }
            jiekou.html(str);
        }
    }

}


