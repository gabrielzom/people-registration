$("#input-zip_code").on("change", function () {
	const cep = $(this).val();
	axios
		.get(`https://ws.apicep.com/cep/${cep}.json`)
		.then(response => {
			$("#input-public_place").val(response.data.address);
			$("#input-city").val(response.data.city);
			$("#input-district").val(response.data.district);
			$("#input-state").val(response.data.state);
		})
		.catch(error => console.log(error))
})

$(document).ready(function () {
	let navLink;
	if (window.location.pathname == "/")  {
		navLink = document.getElementById("path-home")
		navLink.setAttribute("class",`active ${navLink.getAttribute("class")}`)

	} else if (window.location.pathname == "/list") {
		navLink = document.getElementById("path-list")
		navLink.setAttribute("class",`active ${navLink.getAttribute("class")}`)

	} else if (window.location.pathname == "/users") {
		navLink = document.getElementById("path-users")
		navLink.setAttribute("class",`active ${navLink.getAttribute("class")}`)
	}
})


let dates = document.getElementsByClassName("date-formated")
for (let i=0; i<dates.length; i++) {
  dates[i].innerText = moment(dates[i].innerText).format("DD/MM/YYYY")
}

$("#btn-logout").on("click", () => {
	$("#modal-logout").modal("show");
  })
  
  $(".cancelar-logout").on("click", () => {
	$("#modal-logout").modal("hide");
})

$("#btn-close-msg").on("click", () => {
	$(".container").remove("#div-msg-warning")
})

