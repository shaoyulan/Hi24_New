$(document).ready(function() {
	//首頁初始化
	index_setup();

	//建立模板產生、放置器 fill template function
	function place_data($structure,$target,$data)
	{
		var html_structure = $($structure).html();
		var compiled_template = Handlebars.compile(html_structure);
		var UI = '';
		$.each($data,function(index,data)
		{
			UI = UI + compiled_template(data);
		});
		$($target).html(UI);
		UI = '';
	};

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
			var fill = $page_to_load;
			var fill = fill.split('/')[1];
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
		var cartInfo = $('js-cartInfo');
		// 購物車目前商品數 Number of items in cart
		var itemCount = $('.js-cartItem').length; //.length 是否會略過display:none的item
		// 空的購物車HTML　Empty Cart HTML
		var itemRow = $('#js-cartItem').clone();
		// 購物車的最後一筆 Last item in cart
		var lastItem = $('.js-cartItem:last');
		// 購物車現有金額 fetch current Cart total
		var currentP = parseInt($('.cart-btn a span').text().slice(1));
		// 被點擊的商品 Clicked Item Box
		var itemBox = $(e.target).closest('.js-itemBox');
		// 被選商品品名
		var itemName = itemBox.find('h5').text();
		// 被選商品ID
		var itemId = itemBox.data('id');
		// 折扣後金額 Discounted Price
		var priceDis = itemBox.find('.js-disPrice').text().slice(1);


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
			// 購物車放入新的商品
			itemRow.insertAfter(lastItem).removeAttr('id','js-cartItem').removeClass('hide');
			  // 修改標題
			  itemRow.find('.js-itemTitle').text(itemName);
			  // 修改金額
			  itemRow.find('.js-itemPrice').text(price);
			  // 加上ID
			  itemRow.data('id',itemId);
		}
		

		// set btn to red bgc
		target.stop().toggleClass('buy');

		// 更新最新總價renew total price
		var newPrice = parseInt(price)+currentP;
		$('.cart-btn a span').text('$'+newPrice+'元');

	});
});

// 購物車頁面加上大小選項