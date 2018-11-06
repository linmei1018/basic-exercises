// 图片预加载
export function m_preload() {
    function PreLoad ( imgs,options ){
        this.imgs = (typeof imgs === 'string')? [imgs]:imgs;
        this.opts = $.extend({},PreLoad.DEFAULTS,options);

        this._unoredered();
    }
    PreLoad.DEFAULTS = {  //默认参数
        each: null,  //每一张图片加载完毕后执行
        all: null  //所以图片加载完毕后执行
    };
    PreLoad.prototype._unoredered = function (){  //无序加载
        let imgs = this.imgs;
        let opts = this.opts;
        let count =0;
        let len = imgs.length;
        $.each(imgs,function(i,src){
            if(typeof  src != 'string') return;
            let imgObj = new Image();
            $(imgObj).on('load error',function(){
                opts.each && opts.each(count);
                if(count >= len-1){
                  opts.all && opts.all();
                }
                count++;
            });
            imgObj.src = src;
        })
    };
    $.extend({
        preload:function(imgs,opts){
          new PreLoad(imgs,opts);
        }
    })
};
