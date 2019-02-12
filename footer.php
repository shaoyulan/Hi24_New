<!-- Footer
================================================== -->
<div id="footer">

	<!-- Container -->
	<div class="container">

		<div class="four columns"> <a href="index.html"><img src="images/logo_footer.png" alt="" class="margin-top-10"/></a>
			<p class="margin-top-15"></p>
		</div>

		<div class="four columns">

			<!-- Headline -->
			<h3 class="headline footer">購物QA</h3>
			<span class="line"></span>
			<div class="clearfix"></div>

			<ul class="footer-links">
				<li><a href="qa/member.html">會員常見問題</a></li>
				<li><a href="qa/shopping.html">購物常見問題</a></li>
				<li><a href="qa/ pickup_questions.html">配送取貨問題</a></li>
				<li><a href="qa/return_product.html">退換貨及退款</a></li>
				<li><a href="qa/invoice_questions.html">發票常見問題</a></li>
			</ul>

		</div>

		<div class="four columns">

			<!-- Headline -->
			<h3 class="headline footer">會員專區</h3>
			<span class="line"></span>
			<div class="clearfix"></div>

			<ul class="footer-links">
				<li><a href="member/member.html">會員資料</a></li>
				<li><a href="member/member.html">訂單 / 問答 / 退貨查詢</a></li>
				<li><a href="member/member.html">帳戶退款查詢 </a></li>
				<li><a href="member/member.html">我的收藏 </a></li>
				<li><a href="member/messagecenter.html">消息中心 </a></li>
			</ul>

		</div>

		<div class="four columns">

			<!-- Headline -->
			<h3 class="headline footer">網站條款</h3>
			<span class="line"></span>
			<div class="clearfix"></div>

			<ul class="footer-links">
				<li><a href="page/terms.html">網站使用條款</a></li>
				<li><a href="page/policy.html">隱私權政策</a></li>
				<li><a href="page/disclaimer">免責聲明</a></li>
			</ul><br>
            
            <ul class="payment-icons">
				<li><img src="images/visa.png" alt="" /></li>
				<li><img src="images/mastercard.png" alt="" /></li>
				<li><img src="images/skrill.png" alt="" /></li>
				<li><img src="images/moneybookers.png" alt="" /></li>
				<li><img src="images/paypal.png" alt="" /></li>
			</ul>

		</div>

	</div>
	<!-- Container / End -->

</div>
<!-- Footer / End -->

<!-- Footer Bottom / Start -->
<div id="footer-bottom">

	<!-- Container -->
	<div class="container">

		<div class="eight columns">© Copyright 2018 by <a href="#">Hi24</a>. All Rights Reserved.</div>
		<div class="eight columns">
            <nav class="footer-nav">
			<a href="page/about.html">聯絡我們</a>
			<a href="news/news.html">最新訊息</a>
		</nav>
		</div>

	</div>
	<!-- Container / End -->

</div>
<!-- Footer Bottom / End -->

<!-- Back To Top Button -->
<div id="backtotop"><a href="#"></a></div>

</div>

<!-- Header-slider Template -->
<script id="header-slider-template" type="text/x-handlebars-template"> 
<li data-transition="{{transition}}" data-slotamount="7" data-masterspeed="{{speed}}">
	<a href="{{page_url}}">
		<img src="{{img_url}}"  alt="{{alt}}"  data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat">
	</a>
	<div class="{{caption_stat}}" data-x="{{dataX}}" data-y="{{dataY}}" data-speed="400" data-start="800"  data-easing="Power4.easeOut">
		<h2>{{title}}</h2>
		<h4>{{caption}}</h4>
		<a href="{{page_url}}" class="caption-btn">More detail</a>
	</div>
</li>
</script>

 <!-- Product list Template -->
 <script id="product-list-template-model" type="text/x-handlebars-template">
    <li class='js-itemBox' data-productid='{{id}}' data-detailid="" data-title='{{title}}' data-maincat='{{category_main}}' data-subcat='{{category_sub}}'> 
    	<figure class="product">
    		<div class="product-discount">{{activity_text}}</div>
    		<div class="mediaholder">
    			<a href="product/product_detail.html">
    				<img alt="" src="{{img_url1}}"/>
    				<div class="cover">
    					<img alt="" src="{{img_url2}}"/>
    				</div>
    			</a>
    			<a href="product/product_detail.html" class="product-button"><i class="fa fa-shopping-cart"></i> 加入購物車</a>
    		</div>

    		<a href="product/product_detail.html">
    			<section>
    				<span class="product-category">{{category_sub}}</span>
    				<h5>{{title}}</h5>
    				<span class="{{discount}}">{{price_org}}<i class='js-disPrice'>{{price_dis}}</i></span>
    			</section>
    		</a>
    	</figure>
    </li>
</script>

 <!-- Product list Template Categoried -->
<script id="product-list-template" type="text/x-handlebars-template">
<li data-id='{{id}}'><a href="product/product_detail.html">
	<img src="{{img_url1}}" alt="" />
	<div class="product-list-desc">{{title}}<i>{{price_org}}<b>{{price_dis}}</b></i></div>
</a></li>
</script>

<!-- News template -->
<script id="news-template" type="text/x-handlebars-template">
<div class="four columns">
	<article class="from-the-news">
		<figure class="from-the-news-image">
			<a href="news/news_detail.html"><img src="{{img_url}}" alt="" /></a>
			<div class="hover-icon"></div>
		</figure>
		<section class="from-the-news-content">
			<a href="news/news_detail.html"><h5>{{title}}</h5></a>
			<i>{{date}}</i>
			<span>{{{context}}}</span>
			<a href="news/news_detail.html" class="button gray">更詳細 <i class="fa fa-angle-double-right"></i></a>
		</section>
	</article>
</div>
</script>
<script id="product_defPhotos_tmp" type="text/x-handlebars-template">
	<p><img src="{{inner_photo1}}"></p>
	<p><img src="{{inner_photo2}}"></p>
	<p><img src="{{inner_photo3}}"></p>
	<p><img src="{{inner_photo4}}"></p>
</script>

<script id="product_mainPhotos_tmp" type="text/x-handlebars-template">
	<img class="rsImg" src="{{main_photo_substitute}}" data-rsTmb="{{main_photo_substitute}}" alt="" id="photo">
	<img class="rsImg colorBox" src="{{color}}" data-rsTmb="{{color}}" data-title="{{title}}" alt="" d="photo">
</script>

</body>
</html>


<!-- Java Script
================================================== -->
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!-- Handlebars template -->
<script src="scripts/handlebars-v4.0.12.js"></script>
<!-- website main js -->
<script src="js/main.js"></script>

<script src="scripts/jquery.jpanelmenu.js"></script>
<script src="scripts/jquery.themepunch.plugins.min.js"></script>
<script src="scripts/jquery.themepunch.revolution.min.js"></script>
<script src="scripts/jquery.themepunch.showbizpro.min.js"></script>
<script src="scripts/jquery.magnific-popup.min.js"></script>
<script src="scripts/hoverIntent.js"></script>
<script src="scripts/superfish.js"></script>
<script src="scripts/jquery.pureparallax.js"></script>
<script src="scripts/jquery.pricefilter.js"></script>
<script src="scripts/jquery.selectric.min.js"></script>
<script src="scripts/jquery.royalslider.min.js"></script>
<script src="scripts/SelectBox.js"></script>
<script src="scripts/modernizr.custom.js"></script>
<script src="scripts/waypoints.min.js"></script>
<script src="scripts/jquery.flexslider-min.js"></script>
<script src="scripts/jquery.counterup.min.js"></script>
<script src="scripts/jquery.tooltips.min.js"></script>
<script src="scripts/jquery.isotope.min.js"></script>
<script src="scripts/puregrid.js"></script>
<script src="scripts/stacktable.js"></script>
<script src="scripts/custom.js"></script>

