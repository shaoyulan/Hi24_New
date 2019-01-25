<?php 
header('Content-Type: application/json;charset=utf8'); 
include('../DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

// 單一條件，或多重條件
if ($_POST['mode']=='2'){
	// command SQL 
	$sql ='SELECT * FROM `product_list` WHERE `category_main`=:category_main AND `category_sub`=:category_sub ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':category_main',$_POST['category_main']); 
	$statement->bindValue(':category_sub',$_POST['category_sub']);
	//should use " cause :category_main in $sql only accept "abc"
}elseif($_POST['mode']=='product_detail'){
	// command SQL 
	$sql ='SELECT * FROM `product_list` WHERE `id`=:productid ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':productid',$_POST['productid']); 
}elseif ($_POST['mode']=='get_defPhotos') {
	// command SQL 
	$sql ='SELECT * FROM `product_default_photos` WHERE `id`=:id ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':id',$_POST['id']); 

}elseif ($_POST['mode']=='get_mainPhotos') {
	// command SQL  
	$sql ='SELECT DISTINCT `color`,`title`,`main_photo_substitute` FROM `product_item_detail` WHERE `product_list_ref`=:id ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':id',$_POST['id']);

}elseif ($_POST['mode']=='get_color_avalible') {
	// command SQL  
	$sql ='SELECT DISTINCT `title`FROM `product_item_detail` WHERE `product_list_ref`=:id ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':id',$_POST['id']);
}elseif ($_POST['mode']=='get_size_avalible') {
	// 
	$sql ='SELECT DISTINCT `size` FROM `product_item_detail` WHERE `title`=:title AND `product_list_ref`=:productId ORDER BY `size` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':title',$_POST['colorTitle']);
	$statement->bindValue(':productId',$_POST['productId']);

}elseif ($_POST['mode']=='get_id') {
	$sql ='SELECT `item_id` FROM `product_item_detail` WHERE `title`=:title AND `size`=:size';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':title',$_POST['colorTitle']);
	$statement->bindValue(':size',$_POST['size']);

}elseif ($_POST['mode']=='get_cart') {
	$sql ='SELECT * FROM `cart` WHERE `memberid`=:mem

	berid';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':memberid',$_POST['memberid']);
}else{
	// command SQL 
	$sql ='SELECT * FROM `product_list` WHERE `category_main`=:category_main ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':category_main',$_POST['category_main']); //should use " cause :category_main in $sql only accept "abc"
}
$statement->execute();
$data_filtered = $statement->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($data_filtered,JSON_NUMERIC_CHECK);

?>

