<?php 
header('Content-Type: application/json;charset=utf8'); 
include('../DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
	// 錯誤模式改為有例外都要報錯
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

// 新增至購物車
if ($_POST['mode']=='add_cart'){
	// command SQL 
	$cart = $_POST['cart'];
	// 判斷是要更新 或 新增
	try{
		$sql = 'SELECT `qty` FROM `cart` WHERE `productid`=:productid AND `detailid`=:detailid';
		$statement = $pdo->prepare($sql);
		$statement->bindValue(':productid',$cart[2]["productid"]);
		$statement->bindValue(':detailid',$cart[3]["detailid"]);
		$statement->execute();
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		// echo $result; 

		if($result){
			//需要更新數量
			// $sql = 'UPDATE `cart` SET `qty`=:new_qty WHERE `productid`=:productid AND `detailid`=:detailid';
			// $statement = $pdo->prepare($sql);
			// $statement->bindValue(':qty',$cart[2]["productid"]);
			// $statement->bindValue(':productid',$cart[2]["productid"]);
			// $statement->bindValue(':detailid',$cart[3]["detailid"]);
			// $statement->execute();

		}else{
			// 需新增
		}

	}catch(PDOException $e){
		print "ERROR".$e->getMessage();
	}

	for ($i=0; $i <count($cart) ; $i++) { 
		try{
			$sql ='INSERT INTO `cart`(`memberid`, `orderdate`, `productid`, `detailid`, `itemName`, `price`, `size`, `color`, `qty`, `total`) VALUES (:memberid,:orderdate,:productid,:detailid,:itemName,:price,:size,:color,:qty,:total)';
			$statement = $pdo->prepare($sql);
			$statement->bindValue(':memberid',$cart[$i]["memberid"]);
			$statement->bindValue(':orderdate',$cart[$i]["orderdate"]); 
			$statement->bindValue(':productid',$cart[$i]["productid"]);
			$statement->bindValue(':detailid',$cart[$i]["detailid"]);
			$statement->bindValue(':itemName',$cart[$i]["itemName"]);
			$statement->bindValue(':price',$cart[$i]["price"]);
			$statement->bindValue(':size',$cart[$i]["size"]);
			$statement->bindValue(':color',$cart[$i]["color"]);
			$statement->bindValue(':qty',$cart[$i]["qty"]);
			$statement->bindValue(':total',$cart[$i]["total"]); 

			$statement->execute();
		}catch (PDOException $e){
			print "ERROR".$e->getMessage();
		}
	}
	
	//should use " cause :category_main in $sql only accept "abc"
}
// $statement->execute();
// $data_filtered = $statement->fetchAll(PDO::FETCH_ASSOC);
if($result){
	echo json_encode($result);
} 
// echo json_encode($data_filtered,JSON_NUMERIC_CHECK);

?>
