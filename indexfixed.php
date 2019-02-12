<?php include('header.php')?>
<?php include('crud/data.php')?>
<body class="boxed">
<div id="wrapper">


<!-- Top Bar
================================================== -->
<div id="top-bar">
	<div class="container">

		<!-- Top Bar Menu -->
		<div class="ten columns">
			<ul class="top-bar-menu">
				<li><i class="fa fa-phone"></i> (04) 123 4567</li>
				<li><i class="fa fa-envelope"></i> <a href="#">hi24@gmail.com</a></li>
			</ul>
		</div>

		<!-- Social Icons 粉絲小圖示-->
		<div class="six columns">
			<ul class="social-icons">
				<li><a class="facebook" href="#"><i class="icon-facebook"></i></a></li>
				<li><a class="twitter" href="#"><i class="icon-twitter"></i></a></li>
				<li><a class="dribbble" href="#"><i class="icon-dribbble"></i></a></li>
				<li><a class="gplus" href="#"><i class="icon-gplus"></i></a></li>
				<li><a class="pinterest" href="#"><i class="icon-pinterest"></i></a></li>
			</ul>
		</div>

	</div>
</div>

<div class="clearfix"></div>

    <!-- 手機版下方選單 -->
	<div id="below-menu">
		<div class="login-btn"><a href="member/login_register.html"> <i class="fa fa-user"></i> </a></div>
        <div class="cart-btn2"><a href="member/login_register.html" class="button adc">$2278.00</a></div>
	</div>
<!-- Header
================================================== -->
<div class="container">


	<!-- Logo -->
	<div class="four columns">
		<div id="logo">
			<h1><a href="index.html"><img src="images/logo.png" data-at2x="images/logo@2x.png" alt="Hi24" /></a></h1>
		</div>
	</div>


	<!-- Additional Menu -->
	<div class="twelve columns">
		<div id="additional-menu">
			<ul class="clearfix" style='height: 19.2px;'>
				<li class="js-logoutbtn hidden"><a href="#" >訂單查詢 │ 登出</a></li><!--會員登入後改為-->
				<li class="js-loginbtn"><a href="member/login_register.html">登入 │ 註冊</a></li>
			</ul>
		</div>
	</div>


	<!-- Shopping Cart -->
	<div class="twelve columns">

		<div id="cart">

			<!-- Button -->
			<div class="cart-btn">
				<a href="#" class="button adc">$178.00</a>
			</div>

			<div class="cart-list">

			<div class="arrow"></div>

				<div class="cart-amount">
					<span>購物車中有<span id="cart-amount">0</span>件商品</span>
				</div>

					<ul>
						<li class="js-cartInfo">購物車是空的</li>
							<li id="js-cartItem" class="js-cartItem hide">
								<a href="product/product_detail.htm"><img src="images/small_product_list_08.jpg" alt="" /></a>
								<a href="product/product_detail.htm" class="js-itemTitle">商品標題一</a>
								<span >
									<small class="js-item-num-spicific">0</small>
									<small>x </small>
									<small class="js-item-color-spicific"></small>
									<small class="js-item-size-spicific"></small>
								</span>
								<span class="js-itemPrice">$79.00
								</span>
								<div class="clearfix"></div>
							</li>
					</ul>

				<div class="cart-buttons button">
						<a href="shopping/cart_list_box.html" class="view-cart"><span data-hover="View Cart"><span>查看購物車</span></span></a>
						<a href="shopping/information.html" class="checkout"><span data-hover="Checkout">查看結算</span></a>
					</div>
				<div class="clearfix">

				</div>
			</div>

		</div>

		<!-- Search -->
			<nav class="top-search">
				<form action="#" method="get">
					<button><i class="fa fa-search"></i></button>
					<input class="search-field" type="text" placeholder="Search" value=""/>
				</form>
			</nav>

	</div><!-- /.Shopping Cart -->

</div>


<!-- Navigation 主選單
================================================== -->
<div class="container">
	<div class="sixteen columns">
		
		<a href="#menu" class="menu-trigger"><i class="fa fa-bars"></i> Menu</a>

		<nav id="navigation">
			<ul class="menu" id="responsive">

				<li><a href="index.html" class="current homepage" id="current">Home</a></li>

				<li class="dropdown">
					<a href="product/product.html">WOMEN</a>
					<ul>
						<li><a href="product/product_paging.html">上衣類</a></li>
						<li><a href="#">襯衫類</a></li>
						<li><a href="#">外套類</a></li>
						<li><a href="#">針織衫</a></li>
						<li><a href="#">褲&裙裝</a></li>
						<li><a href="#">家居&內著</a></li>
						<li><a href="#">配件</a></li>
					</ul>
				</li>


				<li class="dropdown">
					<a href="product/product.html">MEN</a>
					<ul>
						<li><a href="product/product_paging.html">上衣類</a></li>
						<li><a href="#">襯衫類</a></li>
						<li><a href="#">外套類</a></li>
						<li><a href="#">針織衫</a></li>
						<li><a href="#">褲&裙裝</a></li>
						<li><a href="#">家居&內著</a></li>
						<li><a href="#">配件</a></li>
					</ul>
				</li>


				<li class="dropdown">
					<a href="product/product.html">KIDS</a>
					<ul>
						<li><a href="product/product_paging.html">上衣類</a></li>
						<li><a href="#">襯衫類</a></li>
						<li><a href="#">外套類</a></li>
						<li><a href="#">針織衫</a></li>
						<li><a href="#">褲&裙裝</a></li>
						<li><a href="#">家居&內著</a></li>
						<li><a href="#">配件</a></li>
					</ul>
				</li>

				<li class="dropdown">
					<a href="product/product_sale.html">SALE</a></li>

			</ul>
		</nav>
	</div>
</div>

<div class="wraper">
	<!-- Slider 大廣告
	================================================== -->
	<div class="container fullwidth-element home-slider">
		<div class="newpage"> <!-- Pages holder -->

		</div> 

		<div class="tp-banner-container">
			<div class="tp-banner">
				<ul id="headerAdContainer">

				</ul>
			</div>
		</div>
	</div>


	<!-- Featured (主選單商品分類)廣告
	================================================== -->
	<div class="container" >

		<div class="one-third column">
			<a href="product/product.html" class="img-caption" >
				<figure>
					<img src="images/in_img/b2_01.jpg" alt="" />
					<figcaption>
						<h3>WOMEN Shirts</h3>
						<span>25% Off Autumn And Winter</span>
					</figcaption>
				</figure>
			</a>
		</div>

		<div class="one-third column">
			<a href="product/product.html" class="img-caption" >
				<figure>
					<img src="images/in_img/b2_02.jpg" alt="" />
					<figcaption>
						<h3>MEN Jacket</h3>
						<span>Winter Jacket Season Sales</span>
					</figcaption>
				</figure>
			</a>
		</div>

		<div class="one-third column">
			<a href="product/product.html" class="img-caption" >
				<figure>
					<img src="images/in_img/b2_03.jpg" alt="" />
					<figcaption>
						<h3>KIDS Pants & dresses</h3>
						<span>Winter Discount</span>
					</figcaption>
				</figure>
			</a>
		</div>	

		<div class="one-third column">
			<a href="#" class="img-caption" >
				<figure>
					<img src="images/in_img/b3_01.jpg" alt="" />
				</figure>
			</a>
		</div>

		<div class="one-third column">
			<a href="#" class="img-caption" >
				<figure>
					<img src="images/in_img/b3_02.jpg" alt="" />
				</figure>
			</a>
		</div>

		<div class="one-third column">
			<a href="#" class="img-caption" >
				<figure>
					<img src="images/in_img/b3_03.jpg" alt="" />
				</figure>
			</a>
		</div>

	</div>
	<div class="clearfix"></div>


	<!-- New Arrivals 新品上架或最新活動
	================================================== -->
	<div class="container">
	
		<!-- Headline -->
		<div class="sixteen columns">
			<h3 class="headline">New Arrivals</h3>
			<span class="line margin-bottom-0"></span>
		</div>

		<!-- Carousel -->
		<div id="new-arrivals" class="showbiz-container sixteen columns" >

			<!-- Navigation -->
			<div class="showbiz-navigation">
				<div id="showbiz_left_1" class="sb-navigation-left"><i class="fa fa-angle-left"></i></div>
				<div id="showbiz_right_1" class="sb-navigation-right"><i class="fa fa-angle-right"></i></div>
			</div>
			<div class="clearfix"></div>

			<!-- Products -->
			<div class="showbiz" data-left="#showbiz_left_1" data-right="#showbiz_right_1" data-play="#showbiz_play_1" >
				<div class="overflowholder">

					<ul id="productList">
							<!-- products goes here -->

					</ul>
					<div class="clearfix"></div>

				</div>
				<div class="clearfix"></div>
			</div>
		</div>

	</div>


	<!-- Parallax Banner
	================================================== -->
	<div class="parallax-banner fullwidth-element"  data-background="#000" data-opacity="0.45" data-height="200">
		<img src="images/in_img/b4_02.jpg" alt="" />
		<div class="parallax-overlay"></div>
		<div class="parallax-title">End of season sale <span>Up to 35% off Women’s Denim</span></div>
	</div>


	<!-- Product Lists
	================================================== -->
	<div class="container margin-bottom-25">

		<!-- Best Sellers -->
		<div class="one-third column">

			<!-- Headline -->
			<h3 class="headline">WOMEN</h3>
			<span class="line margin-bottom-0"></span>
			<div class="clearfix"></div>


			<ul class="product-list" id="product-list-categoried1">

				<!-- product-list-categoried goes here -->
				<li><div class="clearfix"></div></li>

			</ul>

		</div>


		<!-- Top Rated -->
		<div class="one-third column">

			<!-- Headline -->
			<h3 class="headline">MEN</h3>
			<span class="line margin-bottom-0"></span>
			<div class="clearfix"></div>


			<ul class="product-list top-rated" id="product-list-categoried2">

				<!-- product-list-categoried goes here -->
				<li><div class="clearfix"></div></li>

			</ul>

		</div>


		<!-- Weekly Sales -->
		<div class="one-third column">

			<!-- Headline -->
			<h3 class="headline">KIDS</h3>
			<span class="line margin-bottom-0"></span>
			<div class="clearfix"></div>


			<ul class="product-list discount" id="product-list-categoried3">

				<!-- product-list-categoried goes here -->
				<li><div class="clearfix"></div></li>

			</ul>

		</div>

	</div>
	<div class="clearfix"></div>


	<!-- Latest Articles  最新訊息
	================================================== -->
	<div class="container" >

		<!-- Headline -->
		<div class="sixteen columns" >
			<h3 class="headline">最新訊息</h3>
			<span class="line margin-bottom-30"></span>
		</div>

		<div id="newsWraper">
			<!-- news goes here -->
		</div>

	</div>

	<div class="margin-top-50"></div>
</div>

<?php include('footer.php')?>
