class fdj {
    constructor(obj) {
        this.qy = $(obj.qy);
        this.xf = $(obj.xf);
        this.df = $(obj.df);
        this.xt = $(obj.xt);
        this.dt = $(obj.dt);
        this.tlist=$(obj.tlist);
        this.link=$(obj.link);
        this.bl = this.df.height() / this.xf.height();
        this.sbx = 0;
        this.sby = 0;
        this.pyx = 0;
        this.pyy = 0;
        this.gl=0;
        
    }
    init() {
        this.gl=$(window).scrollTop();
        let _this = this;
        this.tpqh();
        $(window).on('scroll',function(){
            _this.gl=$(window).scrollTop();
        })
        this.qy.hover(function(){
            _this.df.show();
            _this.xf.show();
        },function(){
            _this.df.hide();
            _this.xf.hide();
        })
        this.qy.on('mousemove', function (ev) {
            _this.sbx = ev.clientX;
            _this.sby = ev.clientY;
            _this.yidong(_this.xf);
            _this.yidong(_this.dt);
           
        })
        this.choose(this.link);
     
    }
    yidong(obj) {
        if (obj == this.xf) {
            this.pyx = this.sbx - this.xt.offset().left - obj.width() / 2;
            this.pyy = this.sby - this.xt.offset().top - obj.height() / 2+this.gl;
            if (this.pyx <= 0) {
                this.pyx = 0;
            } else if (this.pyx >= this.xt.offset().left) {
                this.pyx = this.xt.offset().left;
            }
            if (this.pyy <= 0) {
                this.pyy = 0;
            } else if (this.pyy >= this.xt.height() - this.xf.height()) {
                this.pyy = this.xt.height() - this.xf.height();
            }
            obj.css(
                {
                    "left": this.pyx,
                    "top": this.pyy
                }
            )
        } else if (obj == this.dt) {
            obj.css(
                {
                    "left": -this.pyx * this.bl,
                    "top": -this.pyy * this.bl
                    
                }
            )
        }
    }
    tpqh(){
        let _this=this;
        this.tlist.find('li').on('click',function(){
            _this.dt.attr('src',$(this).find('img').attr('src'));
            _this.xt.find('img').attr('src',$(this).find('img').attr('src'));
        })
    }
    choose(a){
        a.on('click','a',function(){
            a.find('a').each(function(){
                $(this).removeClass("chose");
            })
            $(this).addClass("chose");
        })
    }
}
let a = new fdj({
    qy:'.small',
    xf:'.small_f',
    df:'.big',
    xt:'.small_pic',
    dt:'.big img',
    tlist:'.p_img_list_box',
    link:'.list_e'
});
a.init();
