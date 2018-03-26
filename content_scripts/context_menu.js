
function ContextMenuItem(label, handler){
	this.listItem = document.createElement("li");
	this.listItem.innerHTML = label;
	this.listItem.addEventListener("click", handler);
}

function ContextMenu(){
    this.menuItems = [];
    var thisInst = this;
    var colContextMenu = undefined;
	
	var menuStyle = 
		`#colContextMenu{
				position:fixed;
				visibility:visible;
				width:200px;
				height:100px;
				background-color:#F2F2F2;
				top:0px;
				left:0px;
				z-index:1000;
			}

			#colContextMenu ul{
				padding:5px;
				list-style-type:none;
			}

			#colContextMenu li{
				margin:5px;
				color:black;
				cursor:arrow;
				-webkit-user-select: none;  
				-moz-user-select: none;    
				-ms-user-select: none;      
				user-select: none;
			}

			#colContextMenu li:hover{
				background-color:#D7D7D7;
			}

			#colContextMenu hr{
				border-top:1px solid #D7D7D7;
				margin:0px;
				margin-left:5px;
				margin-right:5px;
				margin-bottom:5px;
			}`;
			
    
	function _openColMenu(event){	
		try{
			if(colContextMenu == undefined){
				colContextMenu = document.createElement("div");
				
				var list = document.createElement("ul");
				
				for(var i = 0; i < thisInst.menuItems.length; i++){
					var li = thisInst.menuItems[i].listItem;
					li.appendChild(document.createElement("hr"));
					list.appendChild(li); 
				}

				colContextMenu.appendChild(list);

				colContextMenu.id = "colContextMenu";
				colContextMenu.style.visibility = "visible";
				var elmStyle = document.createElement("style");
				elmStyle.innerHTML = menuStyle;
				document.body.appendChild(elmStyle);
				document.body.appendChild(colContextMenu);

				window.onclick = function(evt){
					if(evt.button == 0){
						colContextMenu.style.visibility = "hidden";
					}
				};
			}else{
				colContextMenu.style.visibility = "visible"; 
			}
			
			colContextMenu.style.top = event.clientY + 'px';
			colContextMenu.style.left = event.clientX + 'px';

			event.stopPropagation();
		}catch(err){
			console.log(err.message);
		}
	};
	
	//Event mask
	this.onColContextMenuMask = function(event){
		event.preventDefault();
		_openColMenu(event);
	};
}

function GridContextMenu(grid){
	var source = new ContextMenu();
    
    source.menuItems = source.menuItems.concat([
        new ContextMenuItem("Insert Rows", function(row){
            grid.addRow();
            grid.someFunc();
        }),

        new ContextMenuItem("Insert Columns", function(column){
            grid.addCol();
            grid.someFunc();
        })
	]);
	
	Object.assign(this, source);
}

function BSGridContextMenu(bsgrid){
	var source  = new GridContextMenu(bsgrid);
	Object.assign(this, source);
}
