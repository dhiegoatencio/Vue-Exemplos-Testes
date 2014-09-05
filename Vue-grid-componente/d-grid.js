Vue.component('d-grid', {
    data   : "", // Dados da grid. Ex: [{name:"Dhiego",age:22},{name:"Carla",age:20}]
    columns: "", // Colunas visíveis. Formato aceito: [{header: "Nome", key: "name"},{header: "Idade", key: "age"}]
    titulo : "",
    replace: true,

    created: function () {
        this.ascending = {}
    },
    methods: {
        clickOnCell: function(coluna, registro){},
        clickOnHeader: function(col, indexCol){
        	this.sortBy(col.key);
        },
        sortBy: function (key) {
            var asc = this.ascending[key] = !this.ascending[key]
            this.data.sort(function (a, b) {
                var res = a[key] > b[key]
                if (asc) res = !res
                return res ? 1 : -1
            })
        },
		dragStart: function(ev) {
			ev.dataTransfer.effectAllowed='move';
		    var indexId = ev.target.getAttribute('id');
		    ev.dataTransfer.setData("indexId", indexId);
		    ev.dataTransfer.setDragImage(ev.target,0,0);
		    return true
		},
		dragEnter: function(ev) {
		    ev.preventDefault();
			return true
		},
		dragOver: function(ev) {
			ev.preventDefault();
		    return false
		},
		dragDrop: function(ev, indexDropped) {
		    var indexMoved = ev.dataTransfer.getData("indexId");
		    var colMoved = this.columns[indexMoved];
		    this.columns[indexMoved] = this.columns[indexDropped];
		    this.columns.$set(indexDropped, colMoved);  //sintax sugar do VUE, ele dispará a renderização do componente
		    ev.stopPropagation();
		    return false;
		}
    },

    //template: '#grid-template', // Caso queira usar x-template

    template: '{{titulo}}'
    	+'<table>'
		+	'<thead>'
		+		'<tr>'
		+            '<th v-repeat="c:columns"'
		+                'id="{{$index}}"'
		+                'draggable="true"'
		+                'v-on="click:clickOnHeader(c, $index),'
		+                      'dragstart:dragStart,'
		+                      'dragenter:dragEnter,'
        +                      'drop:dragDrop($event, $index),'
        +                      'dragover:dragOver"'
		+            '>'
		+            	'{{c.header}}'
		+            '</th>'
		+        '</tr>'
		+    '</thead>'
		+    '<tbody>'
		+        '<tr v-repeat="data">'
		             // ccess outer loops data using $parent
		+            '<td v-repeat="c:columns" v-on="click:clickOnCell(c, $parent)">{{$parent[c.key]}}</td>'
		+        '</tr>'
		+    '</tbody>'
	    +'</table>'
	    +'<button v-on="click:processo">Processo</button>'
});