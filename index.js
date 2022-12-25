var token = "90938338|-31949273823315028|90952693";
        var dbName = "DELIVERY--DB";
        var relName = "SHIPMENT--TABLE"
        resetForm()
        function validateAndGetFornData() {
            var sno = $("#Shipment_no").val();

            if (sno === "") {
                alert("Shipment No. is required");
                $("#Shipment_no").focus();
                return "";
            }

            var desc = $("#description").val();
            if (desc === "") {
                alert("Description is required");
                $("#description").focus();
                return "";
            }

            var sourcy = $("#source").val();
            if (sourcy === "") {
                alert("Source is required");
                $("#source").focus();
                return "";
            }

            var destination = $("#destination").val();
            if (destination === "") {
                alert("Destination is required");
                $("#destination").focus();
                return "";
            }

            var Shipping_Date = $("#Shipping_Date").val();
            if (Shipping_Date === "") {
                alert("Shipping-Date is required");
                $("#Shipping_Date").focus();
                return "";
            }

            var Expected_Delivery_Date = $("#Expected_Delivery_Date").val();
            if (Expected_Delivery_Date === "") {
                alert("Expected-Delivery-Date is required");
                $("#Expected_Delivery_Date").focus();
                return "";
            }
            var jsonStrObj = {
                Shipment_no: sno,
                description: desc,
                source: sourcy,
                destination: destination,
                Shipping_Date: Shipping_Date,
                Expected_Delivery_Date: Expected_Delivery_Date
            }

            return JSON.stringify(jsonStrObj);
        }
        function UpdateShipment() {
            var jsonStr = validateAndGetFornData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.getItem("rec_no"));
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            if (resultObj.status == 200) {
                alert("Data updated Successfully")
            }
            else if (resultObj.status == 401) {
                alert("Invalid Token")
            }
            else if (resultObj.status == 400) {
                alert("Something went wrong,Try after some time")
            }
            jQuery.ajaxSetup({ async: true });
            resetForm();
        }

        function savetoloavelstorage(resultObj) {
            var data = JSON.parse(resultObj.data)
            localStorage.setItem('rec_no', data.rec_no)
        }
        function resetForm() {
            $("#Shipment_no").val("");
            $("#description").val("").prop("disabled", true);
            $("#source").val("").prop("disabled", true);
            $("#destination").val("").prop("disabled", true);
            $("#Shipping_Date").val("").prop("disabled", true);
            $("#Expected_Delivery_Date").val("").prop("disabled", true);
            $("#Shipment_no").prop("disabled", false)
            $("#savebutton").prop("disabled", true)
            $("#update").prop("disabled", true)
            $("#reset").prop("disabled", true)
        }
        function enableInput() {
            $("#description").prop("disabled", false);
            $("#source").prop("disabled", false);
            $("#destination").prop("disabled", false);
            $("#Shipping_Date").prop("disabled", false);
            $("#Expected_Delivery_Date").prop("disabled", false);
            $("#reset").prop("disabled", false)

        }
        document.getElementById("Shipment_no").addEventListener("focusout", function (event) {
            var result=checkrecord()
        })
        function checkrecord() {
            var sno = $("#Shipment_no").val();
            if (sno === "") {
                alert("Shipment No is required");
                $("#description").focus();
                return "";
            }

            var jsonObj = {
                Shipment_no: sno
            }
            var jsonStr = JSON.stringify(jsonObj);
            if (jsonStr === "") {
                return;
            }
            var getReqStr = createGET_BY_KEYRequest("90938338|-31949273823315028|90952693", "DELIVERY--DB", "SHIPMENT--TABLE", jsonStr, true, true);
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
            if (resultObj.status !=200) {
                $("#savebutton").prop("disabled", false)
                enableInput()
            }
            else{
                $("#savebutton").prop("disabled", true)
                fillData(resultObj)
                return true;
            }
        }
        function fillData(resultObj) {
            var data = JSON.parse(resultObj.data);
            var data1 = JSON.stringify(data.record)
            var data2 = JSON.parse(data1)
            $("#Shipment_no").val(data2.Shipment_no);
            $("#description").val(data2.description);

            $("#source").val(data2.source);
            $("#destination").val(data2.destination);
            $("#Shipping_Date").val(data2.Shipping_Date);
            $("#Expected_Delivery_Date").val(data2.Expected_Delivery_Date);
            jQuery.ajaxSetup({ async: true });
            savetoloavelstorage(resultObj)
            $("#Shipment_no").prop("disabled", true)
            $("#savebutton").prop("disabled", true)
            $("#Shipment_no").prop("disabled", true)
            $("#update").prop("disabled", false)

            enableInput()
        }
        function RegisterShipment() {
            var jsonStr = validateAndGetFornData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);
            
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            if (resultObj.status == 200) {
                alert("Data added Successfully")
            }
            else if (resultObj.status == 401) {
                alert("Invalid Token")
            }
            else if (resultObj.status == 400) {
                alert("Something went wrong,Try after some time")
            }
            jQuery.ajaxSetup({ async: true });
            resetForm();
        }