JeedomApp.component('cardRetour', {
    templateUrl: '../components/retour.html',
    bindings: { url: '=' }
});

JeedomApp.component('cardStatus', {
    templateUrl: '../components/status.html',
    bindings: { 
        message: '=',
        hasError: '=',
        isLoading: '='
    }
});

JeedomApp.component('cardMenu', {
    templateUrl: '../components/menu.html',
    controller: 'menuCtrl',
    bindings: { 
        title: '=',
        icon:  '=',
        items: '=',
        badges: '='
    }
});

JeedomApp.component('listExpandable', {
    templateUrl: '../components/list-expandable.html',
    controller: 'listExpandableCtrl',
    bindings: { 
        title: '=',
        icon: '=',
        data: '=',
        badges: '=',
        actions: '='
    }
});