$(document).ready(function() {
	// 建立購物車陣列
	cart = [];
	// 首頁初始化
	index_setup();
	color_avaliable(1);
	// 使用者是否存在
	function check_userExist(){

		if(sessionStorage.getItem('username')){
			return sessionStorage.getItem('username');
		}else{
			return false;
		}
	}

	// 回傳自訂時間格式
	function time($format){
		var dateObj = new Date();
		var date;
		switch($format){
			case 'today':
				date = dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+(dateObj.getDate());
			break;
		}
		return date;
	}

	//建立模板產生、放置器 fill template function
	function place_data($structure,$target,$data)
	{
		var html_structure = $($structure).html(),
			compiled_template = Handlebars.compile(html_structure),
			UI = '';
		$.each($data,function(index,data)
		{
			UI = UI + compiled_template(data);
		});
		$($target).html(UI);
		UI = '';
	};

	// 建立可塞選的模板產生器，用於點擊不同分類時 篩選基準category_main、sub
	function Call_AJAX_place_data($info_to_send,$where_to_place,$structure,$func_to_do){
		// console.log('Call_AJAX_place_data');

		//判斷裡面是否為空，為空則抓取資料
		if ($($where_to_place).find('.col-md-3').length == 0){
			$.ajax({
				type:'POST', //必填
				url:'../crud/dataFiltered.php',
				dataType:'json',
				data:$info_to_send,
				success:function(data){
					place_data($structure,$where_to_place,data);
				},
				complete:function(){
					if($func_to_do){
						$func_to_do();
					}
				}

			});
		}
	}

	function color_avaliable($productid){
		$.post('../crud/dataFiltered.php', {id:$productid,mode:'get_color_avalible'}, function(data,t,x) {
			return data;
		});
	}

	function Page_loader(e,$page_to_load,$after_load,$push='yes'){
		// shut previous load thread
		window.stop();		
		// 網站頁面載入，使用者是否存在
		if(sessionStorage.getItem('username')){
			username = sessionStorage.getItem('username');
			$('.right .login').html("<span style='color:red'>"+username+"您好!</span>");
		}
		// to avoid footer to show up awkwardly.
		$('#footer').css('display','none');
		// hide page we don't want to use 
		$('.wraper>div').css('display','none');
		// :not selector should NOT use quote mark
		$('.wraper>div:not(.index,#backtotop)').fadeOut(100).load($page_to_load,$after_load).fadeIn(1000);

		if($push!='no' && $page_to_load !='../index_content.php'){
			// 網址列須變更，否則視為同一頁?
			var fill = $page_to_load,
				fill = fill.split('/')[1];
			console.log('state',history.state);
		}

		$('#footer').delay(1000).fadeIn(500);
		// Scroll Top after load
		scrollTop();
	}

	function index_setup(){
		// 放置Bbanner廣告 place Banner carousel
		place_data('#header-slider-template','#headerAdContainer',headerAds);
		// 放置不分類商品place Content products -- Category ALL
		place_data('#product-list-template-model','#productList',products);
		// 放置分類商品 左邊 place Content products -- Category ALL
		var first3 = products.slice(0,3); // slice json陣列，取得前三筆
		place_data('#product-list-template','#product-list-categoried1',first3);
		// 放置分類商品 中間 place Content products -- Category ALL
		var first3 = products.slice(0,3); // 取得前三筆(筆數不夠故一樣用前三)
		place_data('#product-list-template','#product-list-categoried2',first3);
		// 放置分類商品 左邊 place Content products -- Category ALL
		var first3 = products.slice(4,7); // 取得後三筆
		place_data('#product-list-template','#product-list-categoried3',first3);
		// 最新消息News
		place_data('#news-template','#newsWraper',news);
		// 點擊分類後顯示商品分頁 place content products -- Category Women
		/*
		$('body a[href="#service-two"]').on('click',Call_AJAX_place_data({category_main:"women"},'#service-two .row','#product-list-template-model'));
		$('body a[href="#service-three"]').on('click',Call_AJAX_place_data({category_main:"men"},'#service-three .row','#product-list-template-model'));
		$('body a[href="#service-four"]').on('click',Call_AJAX_place_data({category_main:"kid"},'#service-four .row','#product-list-template-model'));
		*/
	}

	function product_detail(e,$this,$push='yes'){
		// 被選的商品 clicked item
		var itemBox = $(e.target).closest('.js-itemBox');

		// 換頁前先取得商品資料 fetch item info before leaving
		if(e){
			if($push!='no'){
				e.preventDefault();
				e.stopPropagation();
				$push = 'yes';

				// e存在&不要push時 代表是使用者點擊商品
				var title = itemBox.data('title'),
					mainCat = itemBox.data('maincat'),
					price_org = itemBox.find('product-price').text(),
					price_dis = itemBox.find('.js-disPrice').text(),
					productId = itemBox.data('productid'),
					detailId = itemBox.data('detailid');

			}
		}// e若不存在 使代表要用全域變數
		
		Page_loader(e,"product/product_detail.php",function(e){

			// Do after_load
			// Chane Breadcrumbs 
			//**************IMPORTANT : Propagation !!******************
			$('.title').data('productid',productId);
			$('.js-maincat-ch').text(Category_translate(mainCat));
			$('.js-maincat-en').text(mainCat);  
			$('.price-org').text(price_org);
			$('.price-dis').text(price_dis);
			// 載入下方四張大圖
			Call_AJAX_place_data({id:productId,mode:'get_defPhotos'},'.js-defPhotos-putHere','#product_defPhotos_tmp');
			// 載入替換的四張照片、設定對應色塊
			$.post('../crud/dataFiltered.php',{id:productId,mode:'get_mainPhotos'},function(data,t,x){
				var target = $('.rsContainer .rsSlide');
				target.each(function(i,k){
					$(this).attr({'src':data[i].main_photo_substitute,'data-rsTmb':data[i].color})
				});
			});

			// 預設選擇第一個
			$('.color-buttons li a:first').css('border','1px solid');

		},$push);
	}

	// 主分類中譯
	function Category_translate($EngName){
		var Cat;
		switch($EngName){
			case 'men':
				Cat = '男裝';
				break; 
			case 'women':
				Cat ='女裝'
				break;
			case 'kid':
				Cat ='童裝'
				break;
		}
		return Cat;
	}


	// 購物車頁面
	function cart_list_box(e){
		if(e){
			e.preventDefault();
			e.stopPropagation();
		}
		
		Page_loader(e,"../shopping/cart_list_box.php",function(e){
			// 取得購物清單(:not 範本)
			$.each(cart,function(key,item){
				// 貨幣格式化
				var total = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(item.total);
				var cartRow = $('#js-cartRowTmp').clone().removeAttr('id').insertAfter('#js-cartRowTmp');
				// 更新資料
				cartRow.find('.name').removeClass('hide').text(item.itemName)
					   .end()
					   .find('.price').text('$'+item.price)
					   .end()
					   .find('.cart-total').text('$'+total);

				// 設定顏色選項 
				console.log(color_avaliable(1));
				$(colors_avalible).each(function(i, value) {
					var option = document.createElement('option');
					option.textContent = value[i].title;
					option.appendTo('#js-color');
				});

			});

		});
	}
	// InterFace UI/UX
		function scrollTop(){
			$('body').animate({'scrollTop':0},600);
		}
		// Scroll-top icon
		$('#backtotop').click(function(e){
			scrollTop();		
		})
/*
	$(window).on('popstate',function(e){
		var func = location.pathname;

		//pathname '/' = 要呼叫'index'
		if(func=='/' || func=='/index.php'){
			func = 'index_content';
		}else{
			// 否則pathname = location.pathname
			func = func.replace('/','');
			func = func.replace('.php','');
		}

		// 不同頁面參數調整
		if(func=='Product_detail'){
			func +='(e,this,"no")';
		}else{
			func +='(e,"no")';
		}
		
		Page_loader(e,$page_to_load,$after_load,$push='yes')

		eval(func);
	});
*/
	// 網站初始載入，使用者是否存在
	if(check_userExist()){
		username = check_userExist();
		$('.right .login').html("<span style='color:red'>"+username+"您好!</span>");
	}

	// Cart number counter
	$('#wrapper').on('click','.product-button',function(e){
		e.preventDefault();
		e.stopPropagation();

		/* 加入會員才能使用購物車
		if(!check_userExist()){
			console.log('test');
			return false;
		}
		*/

		// 空購物車顯示訊息
		var cartInfo = $('.js-cartInfo'),
			// 購物車目前商品數 Number of items in cart
			itemCount = $('.js-cartItem').length, //.length 是否會略過display:none的item
			// 空的購物車HTML　Empty Cart HTML
			itemRow = $('#js-cartItem').clone(),
			// 購物車的最後一筆 Last item in cart
			lastItem = $('.js-cartItem:last'),
			// 購物車現有金額 fetch current Cart total
			currentP = parseInt($('.cart-btn a span').text().slice(1)),
			// 被點擊的商品 Clicked Item Box
			itemBox = $(e.target).closest('.js-itemBox');
			// 被選商品品名
			itemName = itemBox.find('h5').text(),
			// 被選商品productid
			productid = itemBox.data('productid'),
			// 被選商品detailid
			detailid = itemBox.data('detailid'),
			// 商品金額  Price; 折扣 discount || 沒有折扣 no discount
			price = itemBox.find('.js-disPrice').text().slice(1) || itemBox.find('.product-price').text().slice(1);

		
		// 加入購物車/取消 buy or cancel 
		var target = $(e.target).parent().next().find('section'); // 加入購物車按鈕
		var itemNuber = parseInt($('#cart-amount').text()); // 目前購物車商品數量

		// 被選的商品是要取消 或 加入
		if(target.hasClass('buy')){
		//取消
			// renew total number
			$('#cart-amount').text(--itemNuber);
			// cancel order so price -price
			price = -price;
			// 依productid detailid 取得購物車內的目標
			var criteria = '.js-cartItem[data-productid="'+productid+'"]';
				criteria += '[data-detailid="'+detailid+'"]';
			var itemRow = $(criteria);
			// 刪除cart array 對應
			cart.splice([itemRow.data('no')],1);
			// 刪除該筆item row
			itemRow.remove();

		}else{
		//加入
			// renew total number
			$('#cart-amount').text(++itemNuber);
			
			itemRow // 購物車放入新的商品
				.insertAfter(lastItem).removeAttr('id','js-cartItem').removeClass('hide')
				// 修改標題
				.find('.js-itemTitle').text(itemName)
			  	// 修改金額
			  	.end()
			  	.find('.js-itemPrice').text(price)
			  	// 加上productid、detailid
			  	.end() 
			  	//data-no 用於對應cart 陣列排序
				.attr({'data-productid':productid,'data-detailid':detailid,'data-no':(itemCount-1)});

				var size = size || '', qty =qty || 1, total = price*qty, memberid = memberid || 0,
					color = color || '', date = time('today');
				// 更新購物車陣列
				cart.push({
					memberid:memberid,
					orderdate:date,
					productid:productid,
					detailid:detailid,
					itemName:itemName,
					price:price,
					size:size,
					color:color,
					qty:qty,
					total:total
				});
				console.log(cart);
		}
		

		// set btn to yellow bgc
		target.stop().toggleClass('buy');

		// 更新最新總價renew total price
		var newPrice = parseInt(price)+currentP;
		$('.cart-btn a span').text('$'+newPrice+'元');

		// 變更訊息 顯示/隱藏
		if(itemCount ==1){ //只有template時
			cartInfo.addClass('hide');
		}else if(itemCount >=2){
			if(!cartInfo.hasClass('hide')){
				cartInfo.toggleClass('hide');
			}
		}
	});


	// 商品詳細頁點擊載入 - -- ALL
	$('body').on('click','a[href="product/product_detail.html"]',function(e){
		product_detail(e,this);
	});


	// 進入購物車
	$('body').on('click','a[href="shopping/cart_list_box.html"]',function(e){
		cart_list_box(e);
	});
});

// 購物車頁面加上大小選項