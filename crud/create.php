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
		$statement->bindValue(':productid',$cart[0]["productid"]);
		$statement->bindValue(':detailid',$cart[0]["detailid"]);
		$statement->execute();
		$result_qty = $statement->fetchAll(PDO::FETCH_ASSOC);
		// $result_qty 格式;
		// [["qty"=>0],[...],] 

		if($result_qty){
			//需要更新數量
			$sql = 'UPDATE `cart` SET `qty`=:new_qty WHERE `productid`=:productid AND `detailid`=:detailid';
			$statement = $pdo->prepare($sql);
			$new_quty = $result_qty[0]["qty"] + $cart[0]["qty"];
			$statement->bindValue(':new_qty',$new_quty);
			$statement->bindValue(':productid',$cart[0]["productid"]);
			$statement->bindValue(':detailid',$cart[0]["detailid"]);
			$result = $statement->execute();

		}else{
			// 需新增, 資料庫無同樣商品
			// for ($i=0; $i <count($cart) ; $i++) { 
				try{
					$sql ='INSERT INTO `cart`(`memberid`, `orderdate`, `productid`, `detailid`, `itemName`, `price`, `size`, `color`, `qty`, `total`) VALUES (:memberid,:orderdate,:productid,:detailid,:itemName,:price,:size,:color,:qty,:total)';
					$statement = $pdo->prepare($sql);
					$statement->bindValue(':memberid',$cart[0]["memberid"]);
					$statement->bindValue(':orderdate',$cart[0]["orderdate"]); 
					$statement->bindValue(':productid',$cart[0]["productid"]);
					$statement->bindValue(':detailid',$cart[0]["detailid"]);
					$statement->bindValue(':itemName',$cart[0]["itemName"]);
					$statement->bindValue(':price',$cart[0]["price"]);
					$statement->bindValue(':size',$cart[0]["size"]);
					$statement->bindValue(':color',$cart[0]["color"]);
					$statement->bindValue(':qty',$cart[0]["qty"]);
					$statement->bindValue(':total',$cart[0]["total"]); 

					$result = $statement->execute();
				}catch (PDOException $e){
					print "ERROR".$e->getMessage();
				}
			// } end of for loop
			
			//should use " cause :category_main in $sql only accept "abc"
		}

	}catch(PDOException $e){
		print "ERROR".$e->getMessage();
	}

	
}
// $statement->execute();
// $data_filtered = $statement->fetchAll(PDO::FETCH_ASSOC);
if($result){
	echo json_encode($result_qty[0]["qty"]);
} 
// echo json_encode($data_filtered,JSON_NUMERIC_CHECK);

?>
