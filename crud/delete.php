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
if ($_POST['mode']=='delete_cart'){
	// command SQL 
	$cart = $_POST['cart'];
	// 判斷是要更新 或 新增
	try{
		$sql = 'SELECT `qty` FROM `cart` WHERE `productid`=:productid AND `detailid`=:detailid';
		$statement = $pdo->prepare($sql);
		$statement->bindValue(':productid',$_POST["productid"]);
		$statement->bindValue(':detailid',$_POST["detailid"]);
		$statement->execute();
		$result_qty = $statement->fetchAll(PDO::FETCH_ASSOC);
		// $result_qty 格式;
		// [["qty"=>0],[...],] 

		if($result_qty){
			//需要更新數量
			$sql = 'UPDATE `cart` SET `qty`=:new_qty WHERE `productid`=:productid AND `detailid`=:detailid';
			$statement = $pdo->prepare($sql);
			$new_quty = $result_qty[0]["qty"] - 1;
			$statement->bindValue(':new_qty',$new_quty);
			$statement->bindValue(':productid',$_POST["productid"]);
			$statement->bindValue(':detailid',$_POST["detailid"]);
			$result = $statement->execute();

		}else{
			// 該商品在資料庫僅有1筆
			// 刪除 SQL
			try{
				$sql ='DELETE FROM `cart` WHERE `productid`=:productid AND `detailid`=:detailid';
				$statement = $pdo->prepare($sql);
				$statement->bindValue(':productid',$_POST["productid"]);
				$statement->bindValue(':detailid',$_POST["detailid"]);

				$result = $statement->execute();
			}catch (PDOException $e){
				print "ERROR".$e->getMessage();
			}

		}

	}catch(PDOException $e){
		print "ERROR".$e->getMessage();
	}
}

	
	
	//should use " cause :category_main in $sql only accept "abc"
// $statement->execute();
// $data_filtered = $statement->fetchAll(PDO::FETCH_ASSOC);
if($result){
	echo json_encode($result);
} 
// echo json_encode($data_filtered,JSON_NUMERIC_CHECK);

?>
