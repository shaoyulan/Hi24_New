$(document).ready(function() {
	// 建立購物車陣列
	cart = [];
	index_setup();

	
	// 使用者是否存在
	function check_userExist(){

		if(sessionStorage.getItem('username')){
			var user = [];
			user['username'] = (sessionStorage.getItem('username'));
			user['userid'] = (sessionStorage.getItem('userid'));

			// 返回使用者姓名
			return user;

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
				detailId = '',
				$push = 'no';
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
						slider = $('.rsThumbsContainer img');
						// dataLength = data.length;

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

					// 第一個的avalible size
						// 選取distinct size 當顏色 = 第一個顏色title/ prodcutrefid = product id
						var colortitle = $('.color-buttons li:first img').data('title');
						$('.js-color').text(colortitle); // 預設名稱為第一個的color
						$.post('../crud/dataFiltered.php',{colorTitle:colortitle,productId:productId,mode:'get_size_avalible'},function(size,m,x){
							$.each(size,function(key,value){
								var size = value["size"];
								if(key==0){
									// 預設名稱為第一個的size
									$('.js-size').text(size);
									// 選單第一個更新
									$('.selectedValue').text(size);
									// 順便修改id
									$.post('../crud/dataFiltered.php',{colorTitle:colortitle,size:size,mode:'get_id'},function(id,m,x){
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
			console.log('cart',cart);

			// 先清空殘留的商品、價格
			$('.js-cartItem:not(#js-cartItem)').remove(); //殘留商品
			$('.cart-btn a span').text('$0.00'); //紅區 價格
			$('#cart-amount').text(0); //灰區 價格

			//DB購物車有東西
			if(cart.length > 0){
				var cartInfo = $('.js-cartInfo'),
					// 購物車目前商品數 Number of items in cart
					itemCount = 0, 
					// 購物車現有金額 fetch current Cart total
					currentP = 0;

				

				$.each(cart,function(index, item) {

					// 拿空範本
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
					  	.find('.js-item-num-spicific').text(item.qty)
					  	.end()
					  	//data-no 用於對應cart 陣列排序
						.attr({'data-productid':item.productid,'data-detailid':item.detailid,'data-no':(index+1)});
						// 購物車金額累加
						if(item.qty >1 ){
							currentP = currentP + item.qty * item.price;
						}else{
							currentP += item.price;
						}
						
						itemCount += item.qty;
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
	function cart_list_box(e,$userid){
		if(e){
			e.preventDefault();
			e.stopPropagation();
		}
		
		

		Page_loader(e,"../shopping/cart_list_box.php",function(e){

			// 從資料庫抓購物車 / 也可直接從全域cart
			$.post('../crud/dataFiltered.php', {memberid:$userid,mode:'get_cart'}, function($cart, textStatus, xhr) {
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
		var user = check_userExist(),
			login = $('.js-loginbtn'),
			logout =$('.js-logoutbtn');

		$('.js-loginbtn').html("<span style='color:red'>"+user['username']+"您好!</span>");

		//顯示購物車資訊
		renewCart(user['userid']);
		$('.js-loginbtn').on('mouseenter',function(e){
			// 先判斷logout是隱藏的，再做動作
			if(logout.is('.hidden')){
				login.css({'display':'none'});
				logout.toggleClass('hidden');
			}
		});

		$('.js-logoutbtn').on('mouseout',function(e){
			// 先判斷login是隱藏的，再做動作
			if(login.css('display') == 'none'){
				logout.toggleClass('hidden');
				login.css({'display':'block'});
			}
			
		});
	};


	// Cart number counter
	$('#wrapper').on('click','.product-button, .button.adc',function(e){
		e.preventDefault();
		e.stopPropagation();

		 //加入會員才能使用購物車
		if(!check_userExist()){
			alert('請登入會員');
			return false;
		}else{
			userid = sessionStorage.getItem('userid'); 
		}
		

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
			productid = itemBox.data('productid') || $('.button.adc').data('productid'),
			// 被選商品detailid
			detailid = itemBox.data('detailid') || $('.js-id').text();
/*
			// 商品金額  Price; 折扣 discount || 沒有折扣 no discount
			
			price = itemBox.find('.js-disPrice').text().slice(1) || itemBox.find('.product-price').text().slice(1);
*/
		// 加入購物車/取消 buy or cancel 
		var target = $(e.target).parent().next().find('section') || ''; // 加入購物車按鈕
		var itemNuber = parseInt($('#cart-amount').text()); // 目前購物車商品數量

		// 依productid 取得商品資訊
		$.post('../crud/dataFiltered.php',{productid:productid,mode:'product_detail'},function(data,m,x){
			var itemName = data[0].title, // 被選商品品名
				price = data[0].price_dis || data[0].price_org, // 商品金額  Price; 折扣 discount || 沒有折扣 no discount
				size = $('.selectedValue').text() || '',
				qty = $('input[name="quantity"]').val() || 1,
				total = price*qty,
				memberid = userid,
				color = $('.color-buttons a.active img').data('title') || '', 
				date = time('today');	

			// 判斷是在哪個頁面 (首頁: 加入/取消 商品詳細頁:加入)
				// 詳細頁hasClass('buy') 永遠回傳false故皆為加入 OK
			// 被選的商品是要取消 或 加入
			if(target.hasClass('buy')){
			//取消
				// 呼叫Delet api 刪除商品
				$.post('../crud/delete.php',{productid:productid,detailid:detailid},function(result,m,x){
					// 刪除商品後，更新購物車
					renewCart(sessionStorage.getItem('userid'));
				});

			}else{
			//加入
				// 更新購物車陣列
				  // price 先做清理
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
				var last = [];last.push(cart[cart.length-1])
				$.post('../crud/create.php', {cart: last,mode:'add_cart'}, function(data, stextStatu, xhr) {
					console.log(data);
					// 新增商品後，更新購物車
					renewCart(sessionStorage.getItem('userid'));
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
		 //加入會員才能使用購物車
		if(!check_userExist()){
			e.preventDefault();
			alert('請登入會員');
			return false;
		}else{
			userid = sessionStorage.getItem('userid');
			cart_list_box(e,userid); 
		}
		
	});


	// login / Member section
	$('.js-loginbtn').on('click',function(e){
		e.preventDefault();
		

		// function Page_loader(e,$page_to_load,$after_load,$push='yes',$info){

		Page_loader(e,"../member/login_register.php",function(e){

			
			// login verify
			$('#login_register').on('click','.js-login',function(e){
				var username = $('.js-account').val().trim(), password = $('.js-password').val().trim();
				console.log('ps'+password+'us'+username);
				$.ajax({
					type:'POST', //必填
					url:'../crud/meberVerify.php',
					dataType:'json',
					data:{username: username,password:password},
					success:function(data, textStatus, xhr){
// 	`					
						console.log('kk',data);
						if (data.response == '錯誤的帳號或密碼'){
							$('.js-loginbtn').html('<span style="color:red">'+data.response[0]+'!</span>');
						}else{
							//設定內存username

							// 更新購物車
							//提示登入成功、導回首頁
							var username = data.response[0].lastname + data.response[0].firstname
							sessionStorage.setItem('username',username);
							sessionStorage.setItem('userid',data.response[0].id);
							var info = $('<span style="color:red" class="info">親愛的'+username+'您好!</span>');
							$('.js-lognintab')
								.prepend(info)
								.delay(500).animate({opacity:'0'},400,function(e){
									$('.js-lognintab .info').text('將帶您回到首頁').parent().animate({opacity:'1'},400);
								});
							var goindex = setTimeout(function(){window.location.href='index.php';},2000);
						}
					},
					error:function(data, textStatus, xhr){
						console.log('smsAPI呼叫失敗'+xhr)
					},
				});

			}); //NOF login verify


			// Member register 

		// 定義函式內的通用變數
		
		$('#login_register').on('click','.js-registbtn',function(e){
			e.preventDefault();
			// e.stopPropagation();
			 	phone_number = $('.js-registphone').val(),
				password = $('.js-registpassword').val(),
				checkpassword = $('.js-checkpassword').val();
				console.log('phone',phone_number);
				console.log('password',password);
			// Page_loader(e,"../member/login_register2.php");
			// 確認密碼一致
			if(checkpassword != password){
				// 是否已有訊息 否則顯示
				if(!$('login-info')){
					var info =$('<span style="color:red" class="login-info">密碼輸入不同!</span>');
					$('.js-regist').append(info);
				}
			}else{
				// 產生亂數
				var verify_num="";
				for (var i = 1; i <= 4; i++) {
					verify_num += String(Math.floor((Math.random()*10)));
				}
				console.log('驗證碼'+verify_num);
				// 呼叫SMS API
				$.ajax({
					type:'POST', //必填
					url:'../SMS API/sms_api2.php',
					dataType:'json',
					data:{phone_number:phone_number,verify_num:verify_num},
					success:function(data, textStatus, xhr){
						$('.login_register h3:eq(0)').text('簡訊API呼叫成功：餘額'+data.balance+'元')
						// console.log();
					},
					error:function(data, textStatus, xhr){
						console.log('smsAPI呼叫失敗'+xhr)
					},
				});

				$('.js-regist .headline').text('請輸入您手機收到的驗證碼');
				// 驗整碼輸入框
				var inputarea = 
				'<p class="form-row form-row-wide">'+
					'<label for="reg_email">驗證碼： <span class="required">*</span></label>'+
					'<input type="text" class="input-text js-smscode" placeholder="輸入驗證碼" value="" />'+
				'</p>'+
				'<p class="form-row">'+
					'<input type="button" class="button js-sendsmscode" value="送出" />'+
				'</p>';
				// 轉場出現
				$('.js-regist form').animate({opacity:0},400,function(e){
					$(this).html(inputarea).animate({opacity:1});
				});
			}

			//使用者點擊送出簡訊驗證碼
			$('#login_register').on('click','.js-sendsmscode',function(e){
				e.preventDefault();
				e.stopPropagation();
				//取得使用者輸入
				var user_input = $('.js-smscode').val();
				if(user_input == verify_num){
					Page_loader(e,"../member/information.php #js-information",function(e){
						//使用者填寫資訊
						$('input[name="tel"]').val(phone_number);

						$('#js-information').on('click','.js-informationbtn',function(e){
							console.log('jsinformation');
							e.preventDefault();
							e.stopPropagation();

							console.log(password);
							console.log(phone_number);
							// 取得填寫資訊
							var memberinfo = $('.information-panel').serializeArray();
							memberinfo.push({'name':'password','value':password},{'name':'username','value':phone_number});
							// 解碼 (若使用serialize方法)
							// memberinfo = decodeURIComponent(memberinfo,true);
							
							$.ajax({
								type:'POST', //必填
								url:'../crud/meberRegister.php',
								dataType:'json',
								data:{memberinfo:memberinfo},
								success:function(userid, textStatus, xhr){
									//  userid 格式：
									// {result:[{id:'24'}]}
									console.log('userid',userid);
									// alert('註冊成功');

									// 設定內存username
									sessionStorage.setItem('useraccount',phone_number);
									sessionStorage.setItem('userid',userid.result[0].id);
									var username = userid.result[0].lastname+userid.result[0].firstname;
									sessionStorage.setItem('username',username);
									// 存入sesstion後資料會被"先"用tostring轉成字串，
									// 如果是存入Object，則只會存入"字面直"[object object]
									// 故要存object 需先轉字串JSON.stringify，getItem後再JSON.parse
									// 參考：https://ithelp.ithome.com.tw/articles/10195522
									
									// 導向回首頁
									setTimeout(function(){window.location.href='index.php';},2000);
								},
								error:function(data, textStatus, xhr){
									console.log('失敗'+xhr)
								},
							}); 
						});
					},'yes');
				}
			});
		}); //end-of-member-register

		});
	});
});

// 購物車頁面加上大小選項


