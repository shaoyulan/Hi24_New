<?php 
include('DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
}catch(PDOException $e){
	echo "Database connection failed.";
	exit;
}

// command SQL 
$sql ='SELECT * FROM `header_ad` ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
$statement->execute();
$headerAds = $statement->fetchAll(PDO::FETCH_ASSOC); 

// command SQL 
$sql ='SELECT * FROM `product_list` ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
$statement->execute();
$product_list = $statement->fetchAll(PDO::FETCH_ASSOC); 

// command SQL 
$sql ='SELECT * FROM `news` ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
$statement->execute();
$news = $statement->fetchAll(PDO::FETCH_ASSOC); 

?>

 <!-- jason format data -->
<script>
	var products = <?= json_encode($product_list,JSON_NUMERIC_CHECK) ?>; 
	// 回傳json格式之陣列
	var headerAds = <?= json_encode($headerAds,JSON_NUMERIC_CHECK) ?>;
	var news = <?= json_encode($news,JSON_NUMERIC_CHECK) ?>;
</script>
