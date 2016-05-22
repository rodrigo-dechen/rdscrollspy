;(function($, w){

    var base = null;
    var list = [];

    $(function(){
        base = $('<div>', {
            id: 'rdscrollspybox'
        }).css({
            position: 'fixed',
            top: 0, bottom: 0,
            left: 0, right: 0,
            'z-index': -1,
            visibility: 'hidden',
            'pointer-events': 'none'
        });
        $('body').prepend(base);
    });

    $(w).scroll(function(){

        if(base === null) return;
        var t = $(base);
        var tela = {};
        if(t.length > 0) {
            tela.top = t.offset().top;
            tela.bot = tela.top + t.height();
            $(list).each(function (i, e){

                var self = $(e);
                var o = e.rdscrollspy;

                var eu = {};
                eu.top = self.offset().top;
                eu.bot = self.height() + eu.top;
                eu.top -= o['offset.top'];

                var pos_ant = (self.hasClass(o['class.up'])? o['class.up'] : (self.hasClass(o['class.middle']) ? o['class.middle'] : (o['class.down'])));
                var vis_ant = (self.hasClass(o['class.visible']) ? o['class.visible'] : o['class.invisible']);

                if (tela.top > eu.top) {
                    self.removeClass(o['class.down'] + ' ' + o['class.middle']).addClass(o['class.up']);
                } else if (tela.bot < eu.bot) {
                    self.removeClass(o['class.up'] + ' ' + o['class.middle']).addClass(o['class.down']);
                } else {
                    self.removeClass(o['class.up'] + ' ' + o['class.down']).addClass(o['class.middle']);
                }

                if (tela.top < eu.bot && tela.bot > eu.top) {
                    self.removeClass(o['class.invisible']).addClass(o['class.visible']);
                } else {
                    self.removeClass(o['class.visible']).addClass(o['class.invisible']);
                }

                var pos_atu = (self.hasClass(o['class.up'])?      o['class.up']: (self.hasClass(o['class.middle'])?  o['class.middle']: (o['class.down'])));
                var vis_atu = (self.hasClass(o['class.visible']) ? o['class.visible'] : o['class.invisible']);

                if(vis_ant == o['class.invisible'] && vis_atu == o['class.visible'])
                    o['visible'].call(e, o);

                if(vis_ant == o['class.invisible'] && vis_atu == o['class.visible'] && pos_atu == o['class.up'])
                    o['visible.up'].call(e, o);

                if(vis_ant == o['class.invisible'] && vis_atu == o['class.visible'] && pos_atu == o['class.down'])
                    o['visible.down'].call(e, o);


                if(vis_ant == o['class.visible'] && vis_atu == o['class.invisible'])
                    o['invisible'].call(e, o);

                if(vis_ant == o['class.visible'] && vis_atu == o['class.invisible'] && pos_atu == o['class.up'])
                    o['invisible.up'].call(e, o);

                if(vis_ant == o['class.visible'] && vis_atu == o['class.invisible'] && pos_atu == o['class.down'])
                    o['invisible.down'].call(e, o);


                if(pos_ant != o['class.middle'] && pos_atu == o['class.middle'])
                    o['inserted'].call(e, o);

                if(pos_ant == o['class.up'] && pos_atu == o['class.middle'])
                    o['inserted.up'].call(e, o);

                if(pos_ant == o['class.down'] && pos_atu == o['class.middle'])
                    o['inserted.down'].call(e, o);


                if(pos_ant == o['class.middle'] && pos_atu != o['class.middle'])
                    o['leave'].call(e, o);

                if(pos_ant == o['class.middle'] && pos_atu == o['class.up'])
                    o['leave.up'].call(e, o);

                if(pos_ant == o['class.middle'] && pos_atu == o['class.down'])
                    o['leave.down'].call(e, o);

            });
        }
    });

    $.fn.rdscrollspy = function(options, valeu){

        if(typeof options == 'object' || typeof options == 'undefined'){

            return $(this).each(function (i, e) {
                var opt = $.extend({
                    'offset.top': 0,
                    'class.up': 'ss-up',
                    'class.down': 'ss-down',
                    'class.middle': 'ss-middle',
                    'class.visible': 'ss-visible',
                    'class.invisible': 'ss-invisible',
                    'visible': function () {},
                    'visible.up': function () {},
                    'visible.down': function () {},
                    'invisible': function () {},
                    'invisible.up': function () {},
                    'invisible.down': function () {},
                    'inserted': function () {},
                    'inserted.up': function () {},
                    'inserted.down': function () {},
                    'leave': function () {},
                    'leave.up': function () {},
                    'leave.down': function () {}
                }, (typeof e.rdscrollspy !== 'undefined' ? e.rdscrollspy : {}), options);

                if (typeof e.rdscrollspy === 'undefined') {
                    e.rdscrollspy = opt;
                    list.push(e);
                } else
                    e.rdscrollspy = opt;
            });

        }else if(typeof options == 'string' && typeof valeu == 'undefined'){
            var i = $(list).index($(this).eq(0));
            if(i >= 0) return list[i].rdscrollspy[options];

        }else if(typeof options == 'string' && typeof valeu != 'undefined'){
            var i = $(list).index($(this).eq(0));
            if(i >= 0) list[i].rdscrollspy[options] = valeu;
            return this;}

        return null;
    };

})(jQuery, window);
