
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Fuze Ginger - Login</title>
<style>
.Error_list{
color:red;
font-weight:400;
}
</style>
<!-- Custom fonts for this template-->
<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"
	type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://kendo.cdn.telerik.com/2019.3.1023/styles/kendo.default-v2.min.css" />
<script src="https://kendo.cdn.telerik.com/2019.3.1023/js/jquery.min.js"></script>
	<!-- Core plugin JavaScript-->
	<script src="vendor/jquery-easing/jquery.easing.min.js"></script>


<!-- Custom styles for this template-->
<link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

	<div class="container">

		<!-- Outer Row -->
		<div class="row justify-content-center">

			<div class="col-xl-10 col-lg-12 col-md-9">

				<div class="card o-hidden border-0 shadow-lg my-5">
					<div class="card-body p-0">
						<!-- Nested Row within Card Body -->
						<div class="row">
							<!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
							<div class="col-lg-2"></div>
							<div class="col-lg-8">
								<div class="p-5">
									<div class="text-center logoImageSize">
										<a
											class="sidebar-brand d-flex align-items-center justify-content-center"
											href="../login">
											<div class="sidebar-brand-icon rotate-n-15">
												<i class="fas fa-laugh-wink"></i>
											</div>
											<div class="sidebar-brand-text mx-3">
												FUZE <sup>Ginger</sup>
											</div>
										</a>
									</div>
									<form class="user" id="user">
										<div class="form-group">
											<input type="email" class="form-control form-control-user"
												id="exampleInputEmail" aria-describedby="emailHelp"
												placeholder="Enter Email Address...">
										</div>
										<div class="form-group">
											<input type="password" class="form-control form-control-user"
												id="exampleInputPassword" placeholder="Password">
										</div>
										<div class="form-group">
											<div class="custom-control custom-checkbox small">
												<input type="checkbox" class="custom-control-input"
													id="customCheck"> <label
													class="custom-control-label" for="customCheck">Admin</label>
											</div>

											<a href="#" id="btnLogin"
												class="btn btn-primary btn-user btn-block"> Login </a>
											<!-- <hr>
                    <a href="index.html" class="btn btn-google btn-user btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>-->
									</form>
			
			<div class="Error_list"></div>
								</div>
							</div>
							<div class="col-lg-2"></div>
						</div>
					</div>
				</div>

			</div>

		</div>

	</div>

	<script type="text/javascript">

		$(document).ready(function() {
		
			var Error_list= $('.Error_list');
			$("#btnLogin").click(function() {		
			    var email = $("#exampleInputEmail").val();
                var password = $("#exampleInputPassword").val();
                var isAdmin =$('#customCheck');
                if(isAdmin[0].checked){
                	var role='ADMIN';
                }else{
                	var role="MEMBER";
                	
                }							// Checking for blank fields..25rem solid #4e73df!important
												if (email == ''|| password == '') {
													$('input[type="email"],input[type="password"]').css("border-left",".25rem solid red");
													$('input[type="email"],input[type="password"]').css("box-shadow","0 0 3px lightgray");
													alert("Please fill all fields...!!!!!!");
												}
												
												var ajax = {
														email : $("#exampleInputEmail").val(),
														password :$("#exampleInputPassword").val(),
														role:role
														 }
												console.log(ajax);
												$.ajax({
										            		"async": true,
										            		"url": "http://localhost:8080/login",
										            		"method": "POST",
										            		/* "data":jQuery.parseJSON(ajax), */
										            		"data":JSON.stringify(ajax),
										            		/* "type":"JSON", */
										            		"headers": {
										            		"content-type": "application/json",
										            		"accept": "application/json"
										            		},
										            		success:function(data){
										            			  if(data.status== 1){
										            				var selectedLogin =JSON.stringify(data.SystemUserLoginData);
										            				console.log(selectedLogin);
                                                                	  localStorage.setItem('SelectedLogin',selectedLogin);
                                                                	  window.location.replace("dashboard");
                                                                	console.log(selectedLogin);
                                                                  }else{
                                                                	  Error_list.append("invalid Credentials ");
                                                                  }
                                                                  
										            			
										            			
										            		},
										            		complete:function(jqXHR){
										            		if(jqXHR.status=='401'){
										            			Error_list.empty();
										            			Error_list.append("invalid Credentials");
										            		}
										            		}
												});
									});
			
			
			
						});
	</script>
	<!-- Bootstrap core JavaScript-->
<!-- 	<script src="vendor/jquery/jquery.min.js"></script> -->
	<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="js/sb-admin-2.min.js"></script>

</body>

</html>
