$(document).ready(function() {
	// 建立購物車陣列
	cart = [];
	index_setup();

	renewCart(0);
	// 使用者是否存在
	function check_userExist(){

		if(sessionStorage.getItem('username')){
			return sessionStorage.getItem('username');
			// 修改登入區顯示大名

			// 顯示購物車資訊


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


	function Page_loader(e,$page_to_load,$after_load,$push='yes',$info){
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
			// 新增history $info 可做為傳遞productid
			history.pushState($info,'',fill);
			// 讓網址維持 localhost:8888
			// history.replaceState(fill,'','/');
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


	function product_detail(e,$this,$push='yes',$productId){
		
		if(e){
			if($push!='no'){
				// productid 是點擊傳入
				e.preventDefault();
				e.stopPropagation();
				$push = 'yes';

				var itemBox = $(e.target).closest('.js-itemBox'),
					productId = itemBox.data('productid'),
					detailId = itemBox.data('detailid');

				// e存在&不要push時 代表是使用者點擊商品
				// var title = itemBox.data('title'),
				// 	mainCat = itemBox.data('maincat'),
				// 	price_org = itemBox.find('product-price').text(),
				// 	price_dis = itemBox.find('.js-disPrice').text(),
				// 	productId = itemBox.data('productid'),
				// 	detailId = itemBox.data('detailid');
			}else{
			// ProductId 是參數
			var productId = $productId,
				detailId = '';
			}
		}

		// 換頁前先取得商品資料 fetch item info before leaving
		$.post('../crud/dataFiltered.php',{productid:productId,mode:'product_detail'},function(data,m,x){

			var title = data[0].title,
				mainCat = data[0].category_main,
				price_org = data[0].price_org,
				price_dis = data[0].price_dis;

			Page_loader(e,"product/product_detail.php",function(e){

				// Do after_load
				//**************IMPORTANT : Propagation !!******************
				$('.title-section, .button.adc').data('productid',productId);
				$('.title-section').find('.title').text(title);
				$('.js-maincat-ch').text(Category_translate(mainCat));
				$('.js-maincat-en').text(mainCat); 
				if(price_dis){
					// 有打折情況
					$('.price-org').text(price_org);
					$('.price-dis').text(price_dis);
				}else{
					//沒有打折
					$('.price-dis').text(price_org);
					$('.js-dollarSg').text('');
				} 
				// 載入下方四張大圖
				Call_AJAX_place_data({id:productId,mode:'get_defPhotos'},'.js-defPhotos-putHere','#product_defPhotos_tmp');
				// 載入替換的四張照片、設定對應色塊
				$.post('../crud/dataFiltered.php',{id:productId,mode:'get_mainPhotos'},function(data,t,x){
					var photoBox = $('.rsContainer .rsImg'),
						colorBox = $('.color-buttons img'),
						slider = $('.rsThumbsContainer img'),
						colorLength = data.length;

					// 載入資料
					for (var i = 0; i < data.length; i++) {
						// 左側大圖載入
						$(photoBox[i]).attr({'src':data[i].main_photo_substitute,'data-rsTmb':data[i].color,'data-title':data[i].title});
						// Hover色塊對應到的大圖
						var onMouseOver = "MM_swapImage('photo','','"+data[i].main_photo_substitute+"',0)";
						$(colorBox[i]).attr({'src':data[i].color,'data-title':data[i].title,'onMouseOver':onMouseOver});
						// 左側下方縮圖slider
						$(slider[i]).attr({'src':data[i].main_photo_substitute});
					}

/*
					//載入照片
					photoBox.each(function(i,k){
						$(k).attr({'src':data[i].main_photo_substitute,'data-rsTmb':data[i].color,'data-title':data[i].title});
					});
					
					// 載入色塊
					colorBox.each(function(r,m){
						// 資料數量必須大於 目前索引編號
						if(r<data.length){
							// onMouseOver 
							var onMouseOver = "MM_swapImage('photo','','"+data[r].main_photo_substitute+"',0)";
							$(m).attr({'src':data[r].color,'data-title':data[r].title,'onMouseOver':onMouseOver});
						}
					});
*/					// 第一個的avalible size
						// 選取distinct size 當顏色 = 第一個顏色title/ prodcutrefid = product id
						var title = $('.color-buttons li:first img').data('title');
						$('.js-color').text(title); // 預設名稱為第一個的color
						$.post('../crud/dataFiltered.php',{colorTitle:title,productId:productId,mode:'get_size_avalible'},function(size,m,x){
							$.each(size,function(key,value){
								var size = value["size"];
								if(key==0){
									// 預設名稱為第一個的size
									$('.js-size').text(size);
									// 選單第一個更新
									$('.selectedValue').text(size);
									// 順便修改id
									$.post('../crud/dataFiltered.php',{colorTitle:title,size:size,mode:'get_id'},function(id,m,x){
										$('.js-id').text(id[0].item_id);
									});
								}
								$(".selectList dd:contains('"+size+"')").addClass('avalible');
							});
						});

					// 做色塊對應Size的on
					$('.color-buttons img, .selectList dd').on('click',function(e){

						// 色塊被點
						if($(this).is('img')){
							e.preventDefault();
							e.stopPropagation();
							that = $(this);
							// 取消所有color active
							$('.color-buttons a').removeClass('active');
							// 更新color active
							that.closest('a').addClass('active');
							// 更新color title
							var colorTitle = that.data('title');
							$('.js-color').text(colorTitle);
							// 更新size avalible
							$.post('../crud/dataFiltered.php',{colorTitle:colorTitle,productId:productId,mode:'get_size_avalible'},function(size,m,x){
								// 清除所有avalible class
								$(".selectList dd").removeClass('avalible');

								// 加上avalible class
								$.each(size,function(key,value){
									var size = value["size"];
									$(".selectList dd:contains('"+size+"')").addClass('avalible');
								});

								// 照選單排序第一個avalible的size
								var size = $('.avalible:first').text();
								$('.js-size').text(size);
								// 選單第一個更新
								$('.selectedValue').text(size);
								// id修改id ****要在所有avalible size都確定之後****
								$.post('../crud/dataFiltered.php',{colorTitle:colorTitle,size:size,mode:'get_id'},function(id,m,x){
									$('.js-id').text(id[0].item_id);
								});
							});
						}else{
						// 大小選單被點
							var colorTitle = $('.color-buttons a.active').find('img').data('title'),
								size = $(this).text();
							// 修改size 顯示
							$('.js-size').text(size);
							// id修改id ****要在所有avalible size都確定之後****
							$.post('../crud/dataFiltered.php',{colorTitle:colorTitle,size:size,mode:'get_id'},function(id,m,x){
								$('.js-id').text(id[0].item_id);
							});
						}
					});
				});
			},$push,productId);

		});
	}

	// 主分類中譯
	// ***HTML編碼為UTF-8 因有中文輸出，請將本JS存成UTF8***
	function Category_translate($EngName){
		var Cat;
		switch($EngName){
			case 'men':
				Cat = "男裝";
				break; 
			case 'women':
				Cat ="女裝"
				break;
			case 'kid':
				Cat ="童裝"
				break;
		}
		return Cat;

	}

	//首頁載入時更新購物車
	function renewCart($memberid){
		$.post('../crud/dataFiltered.php', {memberid:$memberid,mode:'get_cart'}, function($cart, textStatus, xhr) {
			// 修改全域
			cart = $cart;
			//DB購物車有東西
			if(cart.length > 0){
				var cartInfo = $('.js-cartInfo'),
					// 購物車目前商品數 Number of items in cart
					itemCount = 0, 
					// 購物車現有金額 fetch current Cart total
					currentP = 0;
				
				$.each(cart,function(index, item) {
					//拿空範本
					var itemRow = $('#js-cartItem').clone(),
						// 購物車的最後一筆 Last item in cart
						lastItem = $('.js-cartItem:last');

					itemRow // 購物車放入新的商品
						.insertAfter(lastItem).removeAttr('id','js-cartItem').removeClass('hide')
						// 修改標題
						.find('.js-itemTitle').text(item.itemName)
					  	// 修改金額
					  	.end()
					  	.find('.js-itemPrice').text(item.price)
					  	// 加上productid、detailid
					  	.end() 
					  	//data-no 用於對應cart 陣列排序
						.attr({'data-productid':item.productid,'data-detailid':item.detailid,'data-no':(index+1)});
						// 購物車金額累加
						currentP += item.price;
						itemCount ++;
				});

				// 更新購物車金額
				$('.cart-btn a span').text('$'+currentP+'元');

				// 更新購物車數量
				$('#cart-amount').text(itemCount);

				// 是否須隱藏空購物車INFO
				if(itemCount ==1){ //只有template時
					cartInfo.addClass('hide');
				}else if(itemCount >=2){
					if(!cartInfo.hasClass('hide')){
						cartInfo.toggleClass('hide');
					}
				}
			}
		});

	}

	// 購物車頁面
	function cart_list_box(e){
		if(e){
			e.preventDefault();
			e.stopPropagation();
		}
		
		

		Page_loader(e,"../shopping/cart_list_box.php",function(e){

			// 從資料庫抓購物車 / 也可直接從全域cart
			$.post('../crud/dataFiltered.php', {memberid:0,mode:'get_cart'}, function($cart, textStatus, xhr) {
				// 取得購物清單(:not 範本)
				$.each($cart,function(key,item){
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
					$.post('../crud/dataFiltered.php', {id:item.productid,mode:'get_color_avalible'}, function(data,t,x) {
						$(data).each(function(i, value) {
							//為每個顏色建立option
							var option = document.createElement('option');
							option.textContent = value.title;
							option.value = value.title;
							$('.js-color').append(option);
						});
					});
					
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

	$(window).on('popstate',function(e){
		var func = location.pathname;
		var productId = history.state;


		//pathname '/' = 要呼叫'index'
		if(func=='/' || func=='/index.php'){
			func = 'index_content';
		}else{
			// 否則pathname = location.pathname
			func = func.replace('/','');
			func = func.replace('.php','');
		}

		// 不同頁面參數調整
		if(func=='product_detail'){
			func +='(e,this,"no",'+productId+')';
		}else{
			func +='(e,"no")';
		}
		
		// Page_loader(e,$page_to_load,$after_load,$push='yes')

		eval(func);
		
	});

	// 網站初始載入，使用者是否存在
	if(check_userExist()){
		username = check_userExist();
		$('.right .login').html("<span style='color:red'>"+username+"您好!</span>");
	}

	// Cart number counter
	$('#wrapper').on('click','.product-button, .button.adc',function(e){
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
			itemBox = $(e.target).closest('.js-itemBox') || '';
			// 被選商品品名
			//itemName = itemBox.find('h5').text(),
			// 被選商品productid
			productid = itemBox.data('productid') || $('.button.adc').data('productid');
/*			// 被選商品detailid
			detailid = itemBox.data('detailid'),
			// 商品金額  Price; 折扣 discount || 沒有折扣 no discount
			
			price = itemBox.find('.js-disPrice').text().slice(1) || itemBox.find('.product-price').text().slice(1);
*/
		// 加入購物車/取消 buy or cancel 
		var target = $(e.target).parent().next().find('section') || ''; // 加入購物車按鈕
		var itemNuber = parseInt($('#cart-amount').text()); // 目前購物車商品數量
		console.log('inumber0',itemRow);

		// 依productid 取得商品資訊
		$.post('../crud/dataFiltered.php',{productid:productid,mode:'product_detail'},function(data,m,x){
			var itemName = data[0].title, // 被選商品品名
				price = data[0].price_dis || data[0].price_org, // 商品金額  Price; 折扣 discount || 沒有折扣 no discount
				size = $('selectedValue').text() || '',
				qty = $('input[name="quantity"]').val() || 1,
				total = price*qty,
				memberid = memberid || 0,
				color = $('.color-buttons a.active img').data('title') || '', 
				ate = time('today');	

			// 判斷是在哪個頁面 (首頁: 加入/取消 商品詳細頁:加入)
				// 詳細頁hasClass('buy') 永遠回傳false故皆為加入 OK
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
				itemNuber += qty;
				$('#cart-amount').text(itemNuber);
				console.log('inumber',itemRow);
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

					// 更新資料庫購物車
					 // 
					 var last = [];last.push(cart[cart.length-1])
					$.post('../crud/create.php', {cart: last,mode:'add_cart'}, function(data, stextStatu, xhr) {
						// console.log(data);
					});
			}
			

			// set btn to yellow bgc
			if(target){
				target.stop().toggleClass('buy');
			}

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
	});


	// 商品詳細頁點擊載入 - -- ALL
	$('body').on('click','a[href="product/product_detail.html"]',function(e){
		product_detail(e,this,'yes');
	});


	// 進入購物車
	$('body').on('click','a[href="shopping/cart_list_box.html"]',function(e){
		cart_list_box(e);
	});
});

// 購物車頁面加上大小選項