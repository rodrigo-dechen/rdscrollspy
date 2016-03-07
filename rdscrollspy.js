;(function($, w){

    var base = null;
    var list = [];

    $(w).scroll(function(){
        if(base === null) return;
        var t = $(base);
        var tela = {};
        if(t.length > 0) {
            tela.top = t.offset().top;
            tela.bot = t.offset().top + t.height();
            $(list).each(function (i, e) {
                var self = $(e.element);
                var o = e.options;

                var eu = {};
                eu.top = self.offset().top;
                eu.bot = self.height() + eu.top;

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

                var pos_atu = (self.hasClass(o['class.up']) ? o['class.up'] : (self.hasClass(o['class.middle']) ? o['class.middle'] : (o['class.down'])));
                var vis_atu = (self.hasClass(o['class.visible']) ? o['class.visible'] : o['class.invisible']);


                if(vis_ant == o['class.invisible'] && vis_atu == o['class.visible'])
                    o['visible'].call(e.element);

                if(vis_ant == o['class.invisible'] && vis_atu == o['class.visible'] && pos_atu == o['class.up'])
                    o['visible.up'].call(e.element);

                if(vis_ant == o['class.invisible'] && vis_atu == o['class.visible'] && pos_atu == o['class.down'])
                    o['visible.down'].call(e.element);


                if(vis_ant == o['class.visible'] && vis_atu == o['class.invisible'])
                    o['invisible'].call(e.element);

                if(vis_ant == o['class.visible'] && vis_atu == o['class.invisible'] && pos_atu == o['class.up'])
                    o['invisible.up'].call(e.element);

                if(vis_ant == o['class.visible'] && vis_atu == o['class.invisible'] && pos_atu == o['class.down'])
                    o['invisible.down'].call(e.element);


                if(pos_ant != o['class.middle'] && pos_atu == o['class.middle'])
                    o['inserted'].call(e.element);

                if(pos_ant == o['class.up'] && pos_atu == o['class.middle'])
                    o['inserted.up'].call(e.element);

                if(pos_ant == o['class.down'] && pos_atu == o['class.middle'])
                    o['inserted.down'].call(e.element);


                if(pos_ant == o['class.middle'] && pos_atu != o['class.middle'])
                    o['leave'].call(e.element);

                if(pos_ant == o['class.middle'] && pos_atu == o['class.up'])
                    o['leave.up'].call(e.element);

                if(pos_ant == o['class.middle'] && pos_atu == o['class.down'])
                    o['leave.down'].call(e.element);

            });
        }
    });

    $.fn.rdscrollspy = function(options){
        return $(this).each(function(i, e){
            list.push({'element': e, 'options':
                $.extend({
                    'class.up': 'up',
                    'class.down': 'down',
                    'class.middle': 'middle',
                    'class.visible': 'visible',
                    'class.invisible': 'invisible',
                    'visible': function(){},
                    'visible.up': function(){},
                    'visible.down': function(){},
                    'invisible': function(){},
                    'invisible.up': function(){},
                    'invisible.down': function(){},
                    'inserted': function(){},
                    'inserted.up': function(){},
                    'inserted.down': function(){},
                    'leave': function(){},
                    'leave.up': function(){},
                    'leave.down': function(){}
                }, options)
            });
        });
    };

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

    })

})(jQuery, window);