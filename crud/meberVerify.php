<?php 
//CHANGE CONTENT TYPE otherwise the "echo json_encode" will return plain text
header('Content-Type: application/json;charset=utf8'); 

include('../DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

// command SQL 
$sql ='SELECT password FROM `member` where username=:name';
$statement = $pdo->prepare($sql);
$statement->bindValue(':name',$_POST['username']);
$statement->execute();
$password = $statement->fetchAll(PDO::FETCH_ASSOC); 
$password = $password[0]['password'];
// echo $password;
// echo $_POST['username'];
// echo 'ps'.$_POST['password'];
 // and $_POST['password']<>'' and $_POST['name']<>'' 
$verify = '錯誤的帳號或密碼';
if ($password == $_POST['password']  and $_POST['username']!=""){
	 $verify = $_POST['username'];	 
}

echo json_encode(['verify' => $verify]);

?>
