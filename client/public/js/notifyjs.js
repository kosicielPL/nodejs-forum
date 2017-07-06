$.notify.addStyle('glass', {
    html: '<div>\n<span data-notify-text></span>\n</div>',
    classes: {
        base: {
            'padding': '12px 15px 12px 15px',
            'text-shadow': '0 1px 0 rgba(255, 255, 255, 0.5)',
            'background-color': '#fcf8e3',
            'border': '1 px solid rgba(255, 255, 255, 0.2) !important',
            'border-radius': '2px',
            'box-shadow': '0 0 3px #000',
            'white-space': 'nowrap',
            'color': '#000',
        },

        error: {
            // 'color': '#B94A48',
            'background-color': 'rgba(242, 222, 222, 0.8)',
            // 'border-color': 'rgba(238, 211, 215, 1)',
        },

        success: {
            // 'color': '#468847',
            'background-color': 'rgba(223, 240, 216, 0.8)',
            // 'border-color': 'rgba(214, 233, 198, 1)',
        },

        info: {
            // 'color': '#000',
            'background-color': 'rgba(217, 237, 247, 0.8)',
            // 'border-color': 'rgba(188, 232, 241, 1)',
        },

        warn: {
            // 'color': '#C09853',
            'background-color': 'rgba(252, 248, 227, 0.8)',
            // 'border-color': 'rgba(251, 238, 213, 1)',
        },
    },
});
