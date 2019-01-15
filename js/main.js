$(document).ready(function() {
	//首頁初始化
	index_setup();

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
					productId = itemBox.data('.productid'),
					detailId = itemBox.data('.detailid');
			}
		}// e若不存在 使代表要用全域變數
		
		Page_loader(e,"product/product_detail.php",function(e){

			// Do after_load
			// Chane Breadcrumbs 
			//**************IMPORTANT : Propagation !!******************
			$('.js-maincat-ch').text(Category_translate(mainCat));
			$('.js-maincat-en').text(mainCat);  
			$('.price-org').text(price_org);
			$('.price-dis').text(price_dis);
			Call_AJAX_place_data({id:id,mode:'get_defPhotos'},'.js-defPhotos-putHere','#product_defPhotos_tmp');

			// 載入替換的四張照片、設定對應色塊
			Call_AJAX_place_data({id:id,mode:'get_mainPhotos'},'.js-mainPhotos-putHere','#product_mainPhotos_tmp',prodcut_detail_func);
			
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

	//預先定義  載入Prodcut_detail 後 稍後要執行的fuction
	function prodcut_detail_func($vars){
		
		// 將第一張設為active
		$('.colorBox:first').addClass('active');
		
		// 載入右邊區塊
		  // 將title	改為第一件的
		  var title = $('.colorBox:first').data('title');
		  $('.js-title').text(title);


		  // 設定衣服Size avalible status (現有庫存)
		  $.post('../crud/dataFiltered.php', {title:title,mode:"product_item_detail_size"}, function(data, textStatus, xhr) {
		  		 // 訂定Size狀態
		  		 $.each(data,function(key,value){
		  		 	size = value["size"];
		  		 	// :contains only accept text
		  		 	$(".product_detail .p_size:contains('"+size+"')").addClass('avalible');
		  		 });
		  		 // 設定第一個為預設
		  		 $(".product_detail .p_size:eq(0)").addClass('active');
		  });
		  
     	   // 將商品編號改為第一件的
		   var size = $('.p_size:eq(0)').text();
		   var id = get_item_id(title,size,change_id)

		  // 依第一件item id 修改size 區塊 
	} 

	//預先定義  載入Prodcut_detail 後 稍後要執行的fuction
	function prodcut_detail_func($vars){
		
		// 將第一張設為active
		$('.product_detail .p_color').find('a:eq(0) img').addClass('active');
		
		// 載入右邊區塊
		  // 將title	改為第一件的
		  var title = $('.product_detail .p_color').find('a:eq(0)').data('title');
		  $('#icolor').text(title);


		  // 設定衣服Size avalible status (現有庫存)
		  $.post('../crud/dataFiltered.php', {title:title,mode:"product_item_detail_size"}, function(data, textStatus, xhr) {
		  		 // 訂定Size狀態
		  		 $.each(data,function(key,value){
		  		 	size = value["size"];
		  		 	// :contains only accept text
		  		 	$(".product_detail .p_size:contains('"+size+"')").addClass('avalible');
		  		 });
		  		 // 設定第一個為預設
		  		 $(".product_detail .p_size:eq(0)").addClass('active');
		  });
		  
     	   // 將商品編號改為第一件的
		   var size = $('.p_size:eq(0)').text();
		   var id = get_item_id(title,size,change_id)

		  // 依第一件item id 修改size 區塊 
	} 

	// InterFace UI/UX
		function scrollTop(){
			$('body').animate({'scrollTop':0},600);
		}
		// Scroll-top icon
		$('#backtotop').click(function(e){
			scrollTop();		
		})

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

	// Cart number counter
	$('#wrapper').on('click','.product-button',function(e){
		e.preventDefault();
		e.stopPropagation();
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
			// 折扣後金額 Discounted Price
			priceDis = itemBox.find('.js-disPrice').text().slice(1);

		

		// 假如本商品有折扣 if discount exists
		if(priceDis){
			//use discount price
			var price =priceDis;
		}else{
			// use org price
			var price = itemBox.find('.product-price').text().slice(1); 
			
		}
		
		// 加入購物車/取消 buy or cancel 
		var target = $(e.target).parent().next().find('section');
		var itemNuber = parseInt($('#cart-amount').text());

		// 被選的商品是要取消 或 加入
		if(target.hasClass('buy')){
			// renew total number
			$('#cart-amount').text(--itemNuber);
			// cancel order so price = -price
			price = price - (price*2);
		}else{
			// renew total number
			$('#cart-amount').text(++itemNuber);
			
			itemRow // 購物車放入新的商品
				.insertAfter(lastItem).removeAttr('id','js-cartItem').removeClass('hide')
				// 修改標題
				.find('.js-itemTitle').text(itemName)
			  	// 修改金額
			  	.find('.js-itemPrice').text(price)
			  	// 加上productid、detailid
				.attr({'productid':productid,'detailid':detailid});
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
});

// 購物車頁面加上大小選項