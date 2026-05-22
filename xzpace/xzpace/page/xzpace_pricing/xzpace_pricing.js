frappe.pages['xzpace_pricing'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'XZPACE Pricing Dashboard',
		single_column: true
	});
	$(page.main).html(getDashboardHTML());
	$(wrapper).find('.page-head').hide();
	initDashboard();
	// Expose all handler functions to global scope for onclick/oninput/onchange
	window.xzShowTab=xzShowTab;window.xzRenderDashboard=xzRenderDashboard;
	window.xzRenderProducts=xzRenderProducts;window.xzRenderProductCard=xzRenderProductCard;
	window.xzRenderMaterials=xzRenderMaterials;window.xzRenderMachines=xzRenderMachines;
	window.xzRenderControl=xzRenderControl;window.xzRenderQuote=xzRenderQuote;
	window.xzRenderCatalog=xzRenderCatalog;window.xzRenderQuotePreview=xzRenderQuotePreview;
	window.xzCalcProduct=xzCalcProduct;window.xzSaveState=xzSaveState;
	window.xzGetMatRate=xzGetMatRate;window.xzCur=xzCur;window.xzFmt=xzFmt;window.xzN=xzN;
	window.xzAddProduct=xzAddProduct;window.xzDeleteProduct=xzDeleteProduct;
	window.xzToggleProduct=xzToggleProduct;window.xzUpdProd=xzUpdProd;
	window.xzUpdProdPct=xzUpdProdPct;
	window.xzAddMat=xzAddMat;window.xzUpdMat=xzUpdMat;window.xzRemoveMat=xzRemoveMat;
	window.xzAddUph=xzAddUph;window.xzUpdUph=xzUpdUph;window.xzRemoveUph=xzRemoveUph;
	window.xzAddFin=xzAddFin;window.xzUpdFin=xzUpdFin;window.xzRemoveFin=xzRemoveFin;
	window.xzAddLabour=xzAddLabour;window.xzUpdLabour=xzUpdLabour;window.xzRemoveLabour=xzRemoveLabour;
	window.xzUpdMisc=xzUpdMisc;
	window.xzSetMatFilter=xzSetMatFilter;window.xzAddLibItem=xzAddLibItem;
	window.xzUpdLib=xzUpdLib;window.xzRemoveLib=xzRemoveLib;
	window.xzOpenLibPicker=xzOpenLibPicker;window.xzCloseLibPicker=xzCloseLibPicker;
	window.xzPickLibItem=xzPickLibItem;window.xzLpFilter=xzLpFilter;
	window.xzAddMachine=xzAddMachine;window.xzUpdMachineLib=xzUpdMachineLib;
	window.xzRemoveMachineLib=xzRemoveMachineLib;
	window.xzCtrlSave=xzCtrlSave;window.xzUpdLabourRate=xzUpdLabourRate;
	window.xzAddPaySchedule=xzAddPaySchedule;window.xzUpdPaySched=xzUpdPaySched;
	window.xzRemovePaySched=xzRemovePaySched;
	window.xzQSave=xzQSave;window.xzToggleQProduct=xzToggleQProduct;
	window.xzExportPDF=xzExportPDF;window.xzExportCatalog=xzExportCatalog;
};

/* ═══════════════════════════════════════════════════════════════
   HTML + CSS — Complete dashboard structure
   ═══════════════════════════════════════════════════════════════ */
function getDashboardHTML() {
return `<style>
.xzpace-dashboard{font-family:'Montserrat',Arial,sans-serif;background:#F5F0EA;color:#171717;font-size:14px;min-height:100vh}
.xzpace-dashboard :root{--emerald:#24362B;--eucalyptus:#516C60;--terracotta:#C06044;--cream:#F5F0EA;--cream-mid:#EDE8E0;--cream-dark:#DDD7CC;--amber:#D3A222;--near-black:#171717;--grey:#58595B;--white:#FFF;--danger:#C0392B;--success:#27AE60;--font:'Montserrat',Arial,sans-serif;--radius:8px;--radius-sm:4px;--shadow:0 2px 8px rgba(0,0,0,.10);--shadow-lg:0 4px 20px rgba(0,0,0,.15)}
.xzpace-dashboard *{box-sizing:border-box;margin:0;padding:0}
.xzpace-dashboard .xznav{background:#24362B;display:flex;align-items:center;padding:0 24px;height:56px;gap:4px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(0,0,0,.25)}
.xzpace-dashboard .xznav-logo{font-size:22px;font-weight:800;color:#fff;letter-spacing:-1px;margin-right:24px;white-space:nowrap}
.xzpace-dashboard .xznav-logo span{color:#C06044}
.xzpace-dashboard .xznav-tab{padding:8px 16px;border-radius:4px;color:rgba(255,255,255,.7);font-size:13px;font-weight:600;cursor:pointer;border:none;background:none;transition:.2s;white-space:nowrap;font-family:'Montserrat',Arial,sans-serif}
.xzpace-dashboard .xznav-tab:hover{background:rgba(255,255,255,.1);color:#fff}
.xzpace-dashboard .xznav-tab.active{background:#C06044;color:#fff}
.xzpace-dashboard .xznav-spacer{flex:1}
.xzpace-dashboard .xznav-badge{background:rgba(255,255,255,.15);color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px}
.xzpace-dashboard .xzmain{padding:24px;max-width:1400px;margin:0 auto}
.xzpace-dashboard .xzpage{display:none}.xzpace-dashboard .xzpage.active{display:block}
.xzpace-dashboard .xzcard{background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.10);margin-bottom:20px}
.xzpace-dashboard .xzcard-head{padding:16px 20px;border-bottom:1px solid #DDD7CC;display:flex;align-items:center;gap:12px}
.xzpace-dashboard .xzcard-head h2{font-size:15px;font-weight:700;color:#24362B;flex:1}
.xzpace-dashboard .xzcard-body{padding:20px}
.xzpace-dashboard .xzsection-title{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#516C60;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid #EDE8E0}
.xzpace-dashboard .xzbtn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:4px;font-family:'Montserrat',Arial,sans-serif;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:.2s;text-decoration:none}
.xzpace-dashboard .xzbtn-primary{background:#24362B;color:#fff}.xzpace-dashboard .xzbtn-primary:hover{background:#1a2820}
.xzpace-dashboard .xzbtn-accent{background:#C06044;color:#fff}.xzpace-dashboard .xzbtn-accent:hover{background:#a85238}
.xzpace-dashboard .xzbtn-outline{background:transparent;color:#24362B;border:1.5px solid #24362B}.xzpace-dashboard .xzbtn-outline:hover{background:#24362B;color:#fff}
.xzpace-dashboard .xzbtn-ghost{background:transparent;color:#58595B;border:1px solid #DDD7CC}.xzpace-dashboard .xzbtn-ghost:hover{border-color:#24362B;color:#24362B}
.xzpace-dashboard .xzbtn-danger{background:transparent;color:#C0392B;border:1px solid #f5c6c2}.xzpace-dashboard .xzbtn-danger:hover{background:#C0392B;color:#fff}
.xzpace-dashboard .xzbtn-sm{padding:5px 10px;font-size:12px}
.xzpace-dashboard .xzbtn-xs{padding:3px 8px;font-size:11px}
.xzpace-dashboard .xzform-row{display:grid;gap:12px;margin-bottom:14px}
.xzpace-dashboard .xzform-row.cols-2{grid-template-columns:1fr 1fr}
.xzpace-dashboard .xzform-row.cols-3{grid-template-columns:1fr 1fr 1fr}
.xzpace-dashboard .xzform-group{display:flex;flex-direction:column;gap:4px}
.xzpace-dashboard .xzform-group label{font-size:11px;font-weight:700;color:#58595B;text-transform:uppercase;letter-spacing:.05em}
.xzpace-dashboard .xzform-group input,.xzpace-dashboard .xzform-group select,.xzpace-dashboard .xzform-group textarea{padding:8px 10px;border:1.5px solid #DDD7CC;border-radius:4px;font-family:'Montserrat',Arial,sans-serif;font-size:13px;color:#171717;background:#fff;transition:.2s;outline:none}
.xzpace-dashboard .xzform-group input:focus,.xzpace-dashboard .xzform-group select:focus{border-color:#24362B}
.xzpace-dashboard .xzform-group textarea{resize:vertical;min-height:80px}
.xzpace-dashboard .xztable-wrap{overflow-x:auto}
.xzpace-dashboard table{width:100%;border-collapse:collapse}
.xzpace-dashboard th{background:#24362B;color:#fff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:8px 10px;text-align:left;white-space:nowrap}
.xzpace-dashboard td{padding:7px 10px;border-bottom:1px solid #EDE8E0;font-size:13px;vertical-align:middle}
.xzpace-dashboard tr:hover td{background:rgba(36,54,43,.03)}
.xzpace-dashboard td input,.xzpace-dashboard td select{padding:5px 7px;border:1.5px solid #DDD7CC;border-radius:4px;font-family:'Montserrat',Arial,sans-serif;font-size:12px;width:100%;background:#fff;outline:none}
.xzpace-dashboard td input:focus,.xzpace-dashboard td select:focus{border-color:#24362B}
.xzpace-dashboard .xznum{text-align:right;font-variant-numeric:tabular-nums}
.xzpace-dashboard .xzpill{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase}
.xzpace-dashboard .xzpill-emerald{background:rgba(36,54,43,.12);color:#24362B}
.xzpace-dashboard .xzpill-grey{background:#EDE8E0;color:#58595B}
.xzpace-dashboard .xzchips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.xzpace-dashboard .xzchip{padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid #DDD7CC;background:#fff;color:#58595B;transition:.2s}
.xzpace-dashboard .xzchip:hover{border-color:#24362B;color:#24362B}
.xzpace-dashboard .xzchip.active{background:#24362B;color:#fff;border-color:#24362B}
.xzpace-dashboard .xzprod-section{margin-top:16px}
.xzpace-dashboard .xzprod-section-head{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#EDE8E0;border-radius:4px;margin-bottom:8px}
.xzpace-dashboard .xzprod-section-head span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#516C60;flex:1}
.xzpace-dashboard .xzprod-section-head .xzsection-total{font-size:12px;font-weight:700;color:#24362B}
.xzpace-dashboard .xzsummary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.xzpace-dashboard .xzsummary-card{background:#F5F0EA;border-radius:8px;padding:14px 16px;border:1.5px solid #DDD7CC}
.xzpace-dashboard .xzsummary-card .xz-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#58595B;margin-bottom:4px}
.xzpace-dashboard .xzsummary-card .xz-value{font-size:20px;font-weight:800;color:#24362B}
.xzpace-dashboard .xztoggle-row{display:flex;align-items:center;gap:10px;padding:10px 0}
.xzpace-dashboard .xztoggle{position:relative;width:40px;height:22px;flex-shrink:0}
.xzpace-dashboard .xztoggle input{opacity:0;width:0;height:0}
.xzpace-dashboard .xztoggle-slider{position:absolute;inset:0;background:#DDD7CC;border-radius:11px;cursor:pointer;transition:.3s}
.xzpace-dashboard .xztoggle-slider:before{content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.3s}
.xzpace-dashboard input:checked+.xztoggle-slider{background:#24362B}
.xzpace-dashboard input:checked+.xztoggle-slider:before{transform:translateX(18px)}
.xzpace-dashboard .xzoverlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:none;align-items:center;justify-content:center}
.xzpace-dashboard .xzoverlay.open{display:flex}
.xzpace-dashboard .xzmodal{background:#fff;border-radius:8px;width:760px;max-width:96vw;max-height:88vh;display:flex;flex-direction:column;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.xzpace-dashboard .xzmodal-head{padding:16px 20px;border-bottom:1px solid #DDD7CC;display:flex;align-items:center;gap:12px}
.xzpace-dashboard .xzmodal-head h3{font-size:15px;font-weight:700;color:#24362B;flex:1}
.xzpace-dashboard .xzmodal-body{padding:20px;overflow-y:auto}
.xzpace-dashboard .xzdash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:24px}
.xzpace-dashboard .xzkpi-card{background:#fff;border-radius:8px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.10);border-left:4px solid #24362B}
.xzpace-dashboard .xzkpi-card.accent{border-left-color:#C06044}
.xzpace-dashboard .xzkpi-card.amber{border-left-color:#D3A222}
.xzpace-dashboard .xzkpi-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#58595B;margin-bottom:6px}
.xzpace-dashboard .xzkpi-value{font-size:28px;font-weight:800;color:#171717}
.xzpace-dashboard .xzkpi-sub{font-size:12px;color:#58595B;margin-top:4px}
.xzpace-dashboard .xzproduct-list{display:flex;flex-direction:column;gap:12px}
.xzpace-dashboard .xzproduct-item{background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.10);overflow:hidden;border:1.5px solid #DDD7CC}
.xzpace-dashboard .xzproduct-item.expanded .xzproduct-item-body{display:block}
.xzpace-dashboard .xzproduct-item-header{display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;user-select:none}
.xzpace-dashboard .xzproduct-item-header:hover{background:rgba(36,54,43,.03)}
.xzpace-dashboard .xzproduct-item-name{font-size:14px;font-weight:700;color:#24362B;flex:1}
.xzpace-dashboard .xzproduct-item-cat{font-size:11px;color:#58595B}
.xzpace-dashboard .xzproduct-item-sp{font-size:15px;font-weight:800;color:#C06044;white-space:nowrap}
.xzpace-dashboard .xzproduct-item-body{display:none;border-top:1px solid #EDE8E0;padding:16px}
.xzpace-dashboard .xzbreakdown-table{width:100%;border-collapse:collapse;margin-bottom:12px}
.xzpace-dashboard .xzbreakdown-table td{padding:5px 8px;font-size:12px;border-bottom:1px solid #EDE8E0}
.xzpace-dashboard .xzbreakdown-table .bd-label{color:#58595B}
.xzpace-dashboard .xzbreakdown-table .bd-val{text-align:right;font-weight:600;white-space:nowrap}
.xzpace-dashboard .xzbreakdown-table .bd-total td{background:#EDE8E0;font-weight:700;font-size:13px}
.xzpace-dashboard .xzbreakdown-table .bd-sp td{background:rgba(36,54,43,.08);font-weight:800;font-size:14px;color:#24362B;border-bottom:none}
.xzpace-dashboard .xzqp-header{background:#24362B;padding:28px 36px;display:flex;align-items:flex-start;justify-content:space-between}
.xzpace-dashboard .xzqp-logo{font-size:26px;font-weight:800;color:#fff;letter-spacing:-1px}
.xzpace-dashboard .xzqp-logo span{color:#C06044}
.xzpace-dashboard .xzqp-body{padding:32px 36px}
.xzpace-dashboard .xzqp-client-name{font-size:18px;font-weight:700}
.xzpace-dashboard .xzqp-intro{font-size:13px;color:#58595B;line-height:1.7;margin-bottom:24px;padding:16px 20px;background:#F5F0EA;border-radius:4px;border-left:3px solid #C06044}
.xzpace-dashboard .xzqp-items-table{width:100%;border-collapse:collapse;margin-bottom:24px}
.xzpace-dashboard .xzqp-items-table th{background:#24362B;color:#fff;font-size:11px;font-weight:700;text-transform:uppercase;padding:10px 12px;text-align:left}
.xzpace-dashboard .xzqp-items-table td{padding:10px 12px;border-bottom:1px solid #EDE8E0;font-size:13px}
.xzpace-dashboard .xzqp-totals{margin-left:auto;width:320px;margin-bottom:24px}
.xzpace-dashboard .xzqp-totals table{width:100%;border-collapse:collapse}
.xzpace-dashboard .xzqp-totals td{padding:7px 12px;font-size:13px;border-bottom:1px solid #EDE8E0}
.xzpace-dashboard .xzqp-totals td:last-child{text-align:right;font-weight:600}
.xzpace-dashboard .xzqp-grand td{background:#24362B;color:#fff;font-weight:800;font-size:15px;border-bottom:none}
.xzpace-dashboard .xzqp-payment-items{display:flex;gap:12px}
.xzpace-dashboard .xzqp-payment-item{flex:1;background:#F5F0EA;border-radius:4px;padding:12px 14px;text-align:center}
.xzpace-dashboard .xzqp-payment-pct{font-size:22px;font-weight:800;color:#C06044}
.xzpace-dashboard .xzqp-footer{background:#F5F0EA;padding:16px 36px;display:flex;align-items:center;justify-content:space-between;border-top:3px solid #24362B}
.xzpace-dashboard .xzflex{display:flex}.xzpace-dashboard .xzgap-8{gap:8px}.xzpace-dashboard .xzgap-16{gap:16px}
.xzpace-dashboard .xzalign-center{align-items:center}.xzpace-dashboard .xzjustify-between{justify-content:space-between}
.xzpace-dashboard .xzmt-8{margin-top:8px}.xzpace-dashboard .xzmt-16{margin-top:16px}
.xzpace-dashboard .xztext-right{text-align:right}.xzpace-dashboard .xztext-center{text-align:center}
.xzpace-dashboard .xztext-grey{color:#58595B}.xzpace-dashboard .xztext-sm{font-size:12px}.xzpace-dashboard .xztext-xs{font-size:11px}
.xzpace-dashboard .xzdivider{border:none;border-top:1px solid #DDD7CC;margin:16px 0}
.xzpace-dashboard .xzempty-state{text-align:center;padding:40px 20px;color:#58595B}
@media print{.xzpace-dashboard .xznav,.xzpace-dashboard .no-print{display:none!important}.xzpace-dashboard .xzmain{padding:0;max-width:100%}}
</style>

<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<div class="xzpace-dashboard">
<!-- NAV -->
<nav class="xznav">
  <div class="xznav-logo">xzpace<span>.</span></div>
  <button class="xznav-tab active" onclick="xzShowTab('dashboard')">Dashboard</button>
  <button class="xznav-tab" onclick="xzShowTab('products')">Products</button>
  <button class="xznav-tab" onclick="xzShowTab('materials')">Materials Library</button>
  <button class="xznav-tab" onclick="xzShowTab('machines')">Machines</button>
  <button class="xznav-tab" onclick="xzShowTab('control')">Control Center</button>
  <button class="xznav-tab" onclick="xzShowTab('quote')">Quote Builder</button>
  <button class="xznav-tab" onclick="xzShowTab('catalog')">Catalog</button>
  <div class="xznav-spacer"></div>
  <span class="xznav-badge" id="xz-nav-currency">AED</span>
</nav>

<!-- LIBRARY PICKER OVERLAY -->
<div class="xzoverlay" id="xz-lib-overlay">
  <div class="xzmodal">
    <div class="xzmodal-head">
      <h3>Select from Materials Library</h3>
      <button class="xzbtn xzbtn-ghost xzbtn-sm" onclick="xzCloseLibPicker()">Close</button>
    </div>
    <div class="xzmodal-body">
      <div class="xzchips" id="xz-lib-chips"></div>
      <div class="xztable-wrap">
        <table id="xz-lib-table">
          <thead><tr><th>Name</th><th>Type</th><th>Unit</th><th>Rate</th><th>Supplier</th><th></th></tr></thead>
          <tbody id="xz-lib-rows"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- MAIN -->
<div class="xzmain">

<!-- DASHBOARD -->
<div class="xzpage active" id="xz-page-dashboard">
  <div class="xzflex xzalign-center xzjustify-between" style="margin-bottom:20px">
    <div>
      <h1 style="font-size:22px;font-weight:800;color:#24362B">Dashboard</h1>
      <p class="xztext-grey xztext-sm">Overview of your pricing portfolio</p>
    </div>
    <button class="xzbtn xzbtn-primary" onclick="xzShowTab('products')">+ New Product</button>
  </div>
  <div class="xzdash-grid" id="xz-dash-kpis"></div>
  <div class="xzcard">
    <div class="xzcard-head"><h2>Products Overview</h2></div>
    <div class="xzcard-body">
      <div class="xztable-wrap">
        <table>
          <thead><tr><th>#</th><th>Product</th><th>Category</th><th>Direct Cost</th><th>Overhead</th><th>Profit</th><th>Selling Price</th><th>+VAT</th></tr></thead>
          <tbody id="xz-dash-rows"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- PRODUCTS -->
<div class="xzpage" id="xz-page-products">
  <div class="xzflex xzalign-center xzjustify-between" style="margin-bottom:20px">
    <div>
      <h1 style="font-size:22px;font-weight:800;color:#24362B">Products</h1>
      <p class="xztext-grey xztext-sm">Build and price each product in detail</p>
    </div>
    <button class="xzbtn xzbtn-primary" onclick="xzAddProduct()">+ Add Product</button>
  </div>
  <div class="xzproduct-list" id="xz-product-list"></div>
  <div class="xzempty-state" id="xz-products-empty" style="display:none"><p>No products yet. Click <strong>+ Add Product</strong> to get started.</p></div>
</div>

<!-- MATERIALS LIBRARY -->
<div class="xzpage" id="xz-page-materials">
  <div class="xzflex xzalign-center xzjustify-between" style="margin-bottom:20px">
    <div>
      <h1 style="font-size:22px;font-weight:800;color:#24362B">Materials Library</h1>
      <p class="xztext-grey xztext-sm">Manage all materials, rates and suppliers</p>
    </div>
    <button class="xzbtn xzbtn-primary" onclick="xzAddLibItem()">+ Add Material</button>
  </div>
  <div class="xzcard">
    <div class="xzcard-body">
      <div class="xzchips" id="xz-mat-chips"></div>
      <div class="xztable-wrap">
        <table>
          <thead><tr><th>#</th><th>Name</th><th>Type</th><th>Unit</th><th>Rate</th><th>Supplier</th><th>Notes</th><th></th></tr></thead>
          <tbody id="xz-mat-rows"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- MACHINES -->
<div class="xzpage" id="xz-page-machines">
  <div class="xzflex xzalign-center xzjustify-between" style="margin-bottom:20px">
    <div>
      <h1 style="font-size:22px;font-weight:800;color:#24362B">Machines</h1>
      <p class="xztext-grey xztext-sm">Machine hourly rates for production costing</p>
    </div>
    <button class="xzbtn xzbtn-primary" onclick="xzAddMachine()">+ Add Machine</button>
  </div>
  <div class="xzcard">
    <div class="xzcard-body">
      <div class="xztable-wrap">
        <table>
          <thead><tr><th>#</th><th>Machine Name</th><th>Hourly Rate</th><th>Notes</th><th></th></tr></thead>
          <tbody id="xz-machine-rows"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- CONTROL CENTER -->
<div class="xzpage" id="xz-page-control">
  <div style="margin-bottom:20px">
    <h1 style="font-size:22px;font-weight:800;color:#24362B">Control Center</h1>
    <p class="xztext-grey xztext-sm">Global settings — reflected in all products and quotes</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div class="xzcard">
      <div class="xzcard-head"><h2>Pricing Settings</h2></div>
      <div class="xzcard-body">
        <div class="xzsection-title">Formula Parameters</div>
        <div class="xzform-row cols-2">
          <div class="xzform-group"><label>Currency</label><select id="xz-cc-currency" onchange="xzCtrlSave()"><option value="AED">AED</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div>
          <div class="xzform-group"><label>VAT %</label><input type="number" id="xz-cc-vat" min="0" max="100" step="0.5" onchange="xzCtrlSave()"></div>
        </div>
        <div class="xzform-row cols-2">
          <div class="xzform-group"><label>Overhead %</label><input type="number" id="xz-cc-overhead" min="0" max="200" step="1" onchange="xzCtrlSave()"></div>
          <div class="xzform-group"><label>Profit Markup %</label><input type="number" id="xz-cc-profit" min="0" max="1000" step="1" onchange="xzCtrlSave()"></div>
        </div>
        <div class="xzform-group"><label>Default Installation Rate (AED/hr)</label><input type="number" id="xz-cc-install" min="0" onchange="xzCtrlSave()"></div>
        <hr class="xzdivider">
        <div class="xzsection-title">Labour Rates (AED/hr)</div>
        <div id="xz-labour-rates-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>
      </div>
    </div>
    <div class="xzcard">
      <div class="xzcard-head"><h2>Company Information</h2></div>
      <div class="xzcard-body">
        <div class="xzform-group"><label>Company Name</label><input type="text" id="xz-cc-cname" onchange="xzCtrlSave()"></div>
        <div class="xzform-row cols-2" style="margin-top:10px">
          <div class="xzform-group"><label>Phone</label><input type="text" id="xz-cc-cphone" onchange="xzCtrlSave()"></div>
          <div class="xzform-group"><label>Email</label><input type="email" id="xz-cc-cemail" onchange="xzCtrlSave()"></div>
        </div>
        <div class="xzform-row cols-2">
          <div class="xzform-group"><label>Website</label><input type="text" id="xz-cc-cweb" onchange="xzCtrlSave()"></div>
          <div class="xzform-group"><label>Trade License #</label><input type="text" id="xz-cc-ctrade" onchange="xzCtrlSave()"></div>
        </div>
        <div class="xzform-group"><label>Address</label><input type="text" id="xz-cc-caddr" onchange="xzCtrlSave()"></div>
      </div>
    </div>
    <div class="xzcard">
      <div class="xzcard-head"><h2>Quote Defaults</h2></div>
      <div class="xzcard-body">
        <div class="xzform-row cols-2">
          <div class="xzform-group"><label>Lead Time</label><input type="text" id="xz-cc-leadtime" onchange="xzCtrlSave()"></div>
          <div class="xzform-group"><label>Quote Validity</label><input type="text" id="xz-cc-validity" onchange="xzCtrlSave()"></div>
        </div>
        <div class="xzform-group"><label>Payment Terms</label><input type="text" id="xz-cc-payterms" onchange="xzCtrlSave()"></div>
        <hr class="xzdivider">
        <div class="xzsection-title">Payment Schedule Breakdown</div>
        <div id="xz-pay-schedule-rows"></div>
        <button class="xzbtn xzbtn-ghost xzbtn-sm xzmt-8" onclick="xzAddPaySchedule()">+ Add Stage</button>
      </div>
    </div>
    <div class="xzcard">
      <div class="xzcard-head"><h2>Terms &amp; Conditions</h2></div>
      <div class="xzcard-body">
        <div class="xzform-group"><textarea id="xz-cc-tandc" rows="12" onchange="xzCtrlSave()"></textarea></div>
      </div>
    </div>
  </div>
</div>

<!-- QUOTE BUILDER -->
<div class="xzpage" id="xz-page-quote">
  <div class="xzflex xzalign-center xzjustify-between" style="margin-bottom:20px">
    <div>
      <h1 style="font-size:22px;font-weight:800;color:#24362B">Quote Builder</h1>
      <p class="xztext-grey xztext-sm">Build client proposal and export PDF</p>
    </div>
    <div class="xzflex xzgap-8">
      <button class="xzbtn xzbtn-outline" onclick="xzRenderQuotePreview()">Refresh Preview</button>
      <button class="xzbtn xzbtn-accent" onclick="xzExportPDF()">Export PDF</button>
    </div>
  </div>
  <div class="xzcard no-print">
    <div class="xzcard-head"><h2>Quote Details</h2></div>
    <div class="xzcard-body">
      <div class="xzform-row cols-3">
        <div class="xzform-group"><label>Client Name</label><input type="text" id="xz-q-client" onchange="xzQSave()"></div>
        <div class="xzform-group"><label>Project Name</label><input type="text" id="xz-q-project" onchange="xzQSave()"></div>
        <div class="xzform-group"><label>Quote Ref #</label><input type="text" id="xz-q-ref" onchange="xzQSave()"></div>
      </div>
      <div class="xzform-row cols-3">
        <div class="xzform-group"><label>Prepared By</label><input type="text" id="xz-q-by" onchange="xzQSave()"></div>
        <div class="xzform-group"><label>Date</label><input type="date" id="xz-q-date" onchange="xzQSave()"></div>
        <div class="xzform-group"><label>Overall Discount %</label><input type="number" id="xz-q-disc" min="0" max="100" step="0.5" value="0" onchange="xzQSave()"></div>
      </div>
      <hr class="xzdivider">
      <div class="xzsection-title">Select Products for this Quote</div>
      <div id="xz-q-product-picker"></div>
    </div>
  </div>
  <div id="xz-quote-preview-wrap"></div>
</div>

<!-- CATALOG -->
<div class="xzpage" id="xz-page-catalog">
  <div class="xzflex xzalign-center xzjustify-between" style="margin-bottom:20px">
    <div>
      <h1 style="font-size:22px;font-weight:800;color:#24362B">Product Catalog</h1>
      <p class="xztext-grey xztext-sm">Client-facing catalog</p>
    </div>
    <div class="xzflex xzgap-8">
      <button class="xzbtn xzbtn-outline no-print" onclick="xzRenderCatalog()">Refresh</button>
      <button class="xzbtn xzbtn-accent no-print" onclick="xzExportCatalog()">Export Catalog PDF</button>
    </div>
  </div>
  <div id="xz-catalog-wrap"></div>
</div>

</div><!-- /xzmain -->
</div><!-- /xzpace-dashboard -->`;
}


/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
var XZ_MAT_TYPES = ['Wood','Metal','Glass','Paint & Finish','Hardware','Fabric','Foam & Upholstery','Other'];
var XZ_LABOUR_TYPES = ['Carpentry','Painting','Installation','Metal Works','CNC Cut','Upholstery','Other'];
var XZ_CATEGORIES = {
  'Seating': {code:'SE', subs:{'Sofas':'SO','Chairs':'CH','Stools & Poufs':'SP','Benches & Day Beds':'DB'}},
  'Tables': {code:'TB', subs:{'Dining Tables':'DT','Coffee Tables':'CT','Side Tables':'SI','Bedside Tables':'BT','Consoles':'CN','Desks':'DK'}},
  'Storage & Shelving': {code:'ST', subs:{'TV & Entertainment Units':'TV','Sideboards':'SB','Open Shelving':'SH'}},
  'Accessories': {code:'AC', subs:{'Mirrors':'MI','Other':'OT'}},
  'Bedroom': {code:'BD', subs:{'Beds':'BE','Bedside Tables':'BT','Vanities':'VA','Wardrobes':'WR'}},
  'Bundles': {code:'BN', subs:{'Studio Packages':'ST','Room Bundles':'RB'}}
};
function xzGetMatTypes(){return XZ_MAT_TYPES.concat(window.xzState.settings.customMatTypes||[]);}
function xzN(v){return parseFloat(v)||0;}
function xzUid(){return 'id'+Date.now().toString(36)+Math.random().toString(36).slice(2);}
function xzFmt(v){return xzN(v).toLocaleString('en-AE',{minimumFractionDigits:2,maximumFractionDigits:2});}
function xzCur(){return window.xzState.settings.currency||'AED';}

/* ═══════════════════════════════════════════════════════════════
   STATE MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */
var _xzSaveTimer = null;
function xzSaveState(){
	clearTimeout(_xzSaveTimer);
	_xzSaveTimer = setTimeout(function(){
		frappe.call({method:'xzpace.xzpace.api.xzpace.save_state',
			args:{state:JSON.stringify(window.xzState)},
			callback:function(){frappe.show_alert({message:'Saved',indicator:'green'});}
		});
	}, 800);
}

function initDashboard(){
	frappe.call({
		method:'xzpace.xzpace.api.xzpace.load_state',
		callback:function(r){
			window.xzState = r.message || {};
			if(!window.xzState.settings) window.xzState.settings = {};
			if(!window.xzState.materialsLibrary) window.xzState.materialsLibrary = [];
			if(!window.xzState.machines) window.xzState.machines = [];
			if(!window.xzState.products) window.xzState.products = [];
			if(!window.xzState.quote) window.xzState.quote = {clientName:'',project:'',ref:'',preparedBy:'',date:'',discountPct:0,productIds:[]};
			xzRenderDashboard();
		}
	});
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════ */
function xzShowTab(tab){
	var $=function(id){return document.getElementById(id);};
	$$('.xzpace-dashboard .xzpage').forEach(function(p){p.classList.remove('active');});
	$$('.xzpace-dashboard .xznav-tab').forEach(function(t){t.classList.remove('active');});
	if($('xz-page-'+tab)) $('xz-page-'+tab).classList.add('active');
	var idx={dashboard:0,products:1,materials:2,machines:3,control:4,quote:5,catalog:6};
	var tabs=$$('.xzpace-dashboard .xznav-tab');
	if(tabs[idx[tab]]) tabs[idx[tab]].classList.add('active');
	var renders={dashboard:xzRenderDashboard,products:xzRenderProducts,materials:xzRenderMaterials,machines:xzRenderMachines,control:xzRenderControl,quote:xzRenderQuote,catalog:xzRenderCatalog};
	if(renders[tab]) renders[tab]();
	if($('xz-nav-currency')) $('xz-nav-currency').textContent = xzCur();
}
function $$(sel){return document.querySelectorAll(sel);}

/* ═══════════════════════════════════════════════════════════════
   CALCULATIONS
   ═══════════════════════════════════════════════════════════════ */
function xzGetMatRate(m){
	if(m.libId){var lib=window.xzState.materialsLibrary.find(function(l){return l.id===m.libId;});if(lib)return xzN(lib.rate);}
	return xzN(m.rate);
}
function xzCalcProduct(p){
	var s=window.xzState.settings;
	var ohPct=xzN(p.overheadPct!=null?p.overheadPct:s.overheadPct)/100;
	var profPct=xzN(p.profitPct!=null?p.profitPct:s.profitPct)/100;
	var materialsCost=(p.materials||[]).reduce(function(sum,m){return sum+xzN(m.qty)*xzGetMatRate(m);},0);
	var upholsteryCost=(p.upholstery||[]).reduce(function(sum,m){return sum+xzN(m.qty)*xzGetMatRate(m);},0);
	var finishingCost=(p.finishing||[]).reduce(function(sum,m){return sum+xzN(m.qty)*xzGetMatRate(m);},0);
	var manpowerCost=(p.manpower||[]).reduce(function(sum,l){
		var def=xzN((s.laborRates||{})[l.type]||15);
		return sum+xzN(l.hours)*(l.rate!=null?xzN(l.rate):def);
	},0);
	var machinesCost=(p.machineUsage||[]).reduce(function(sum,mu){
		var mc=window.xzState.machines.find(function(m){return m.id===mu.machineId;});
		return sum+xzN(mu.hours)*(mc?xzN(mc.hourlyRate):xzN(mu.rate));
	},0);
	var miscCost=xzN(p.misc&&p.misc.miscConsumables);
	var directCost=materialsCost+upholsteryCost+finishingCost+manpowerCost+machinesCost+miscCost;
	var overhead=directCost*ohPct;
	var dcOH=directCost+overhead;
	var profit=dcOH*profPct;
	var baseSP=dcOH+profit;
	var installCost=0;
	if(p.installation&&p.installation.enabled){
		installCost=p.installation.type==='hourly'
			?xzN(p.installation.hours)*(p.installation.rate!=null?xzN(p.installation.rate):xzN(s.installationRate))
			:xzN(p.installation.flatFee);
	}
	var deliveryCost=(p.delivery&&p.delivery.enabled)?xzN(p.delivery.flatFee):0;
	var sellingPrice=baseSP+installCost+deliveryCost;
	return{materialsCost:materialsCost,upholsteryCost:upholsteryCost,finishingCost:finishingCost,manpowerCost:manpowerCost,machinesCost:machinesCost,miscCost:miscCost,directCost:directCost,overhead:overhead,dcOH:dcOH,profit:profit,baseSP:baseSP,installCost:installCost,deliveryCost:deliveryCost,sellingPrice:sellingPrice,ohPct:ohPct,profPct:profPct};
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
function xzRenderDashboard(){
	var vatPct=xzN(window.xzState.settings.vatPct)/100;
	var products=(window.xzState.products||[]).filter(function(p){return p.active!==false;});
	var totalDC=0,totalSP=0;
	products.forEach(function(p){var c=xzCalcProduct(p);totalDC+=c.directCost;totalSP+=c.sellingPrice;});
	var totalVAT=totalSP*vatPct;
	var el=function(id){return document.getElementById(id);};
	if(el('xz-dash-kpis')) el('xz-dash-kpis').innerHTML=
		'<div class="xzkpi-card"><div class="xzkpi-label">Active Products</div><div class="xzkpi-value">'+products.length+'</div><div class="xzkpi-sub">in library</div></div>'+
		'<div class="xzkpi-card accent"><div class="xzkpi-label">Total Direct Cost</div><div class="xzkpi-value">'+xzCur()+' '+xzFmt(totalDC)+'</div></div>'+
		'<div class="xzkpi-card"><div class="xzkpi-label">Portfolio Selling Price</div><div class="xzkpi-value">'+xzCur()+' '+xzFmt(totalSP)+'</div></div>'+
		'<div class="xzkpi-card amber"><div class="xzkpi-label">Portfolio incl. VAT</div><div class="xzkpi-value">'+xzCur()+' '+xzFmt(totalSP+totalVAT)+'</div></div>';
	var rows=(window.xzState.products||[]).map(function(p,i){
		var c=xzCalcProduct(p);var vatAmt=c.sellingPrice*vatPct;
		return '<tr><td>'+(i+1)+'</td><td><strong>'+(p.name||'Unnamed')+'</strong></td><td><span class="xzpill xzpill-grey">'+(p.mainCategory||'—')+'</span></td>'+
			'<td class="xznum">'+xzCur()+' '+xzFmt(c.directCost)+'</td><td class="xznum">'+xzCur()+' '+xzFmt(c.overhead)+'</td>'+
			'<td class="xznum">'+xzCur()+' '+xzFmt(c.profit)+'</td><td class="xznum"><strong style="color:#24362B">'+xzCur()+' '+xzFmt(c.sellingPrice)+'</strong></td>'+
			'<td class="xznum" style="color:#C06044">'+xzCur()+' '+xzFmt(c.sellingPrice+vatAmt)+'</td></tr>';
	}).join('');
	if(el('xz-dash-rows')) el('xz-dash-rows').innerHTML=rows||'<tr><td colspan="8" class="xztext-center xztext-grey" style="padding:24px">No products yet</td></tr>';
	if(el('xz-nav-currency')) el('xz-nav-currency').textContent=xzCur();
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCTS
   ═══════════════════════════════════════════════════════════════ */
function xzAddProduct(){
	var p={id:xzUid(),active:true,name:'New Product',mainCategory:'',subCategory:'',category:'',notes:'',overheadPct:null,profitPct:null,
		clientDescription:'',quoteQty:1,quoteUnit:'Nos',sku:'',collection:'',care:'',dimH:'',dimW:'',dimD:'',
		specs:[],finishes:[],image:null,drawingsImage:null,materials:[],upholstery:[],finishing:[],
		manpower:[{id:xzUid(),type:'Carpentry',hours:8,rate:null,description:'Carpentry'}],machineUsage:[],
		misc:{miscConsumables:0},installation:{enabled:false,type:'hourly',hours:4,rate:null,flatFee:0,notes:''},
		delivery:{enabled:false,flatFee:0,notes:''}};
	window.xzState.products.push(p);xzSaveState();xzRenderProducts();
	setTimeout(function(){var e=document.getElementById('xz-prod-'+p.id);if(e)e.classList.add('expanded');},50);
}

function xzRenderProducts(){
	var list=document.getElementById('xz-product-list');
	var empty=document.getElementById('xz-products-empty');
	if(!list)return;
	if(!window.xzState.products||window.xzState.products.length===0){list.innerHTML='';if(empty)empty.style.display='block';return;}
	if(empty)empty.style.display='none';
	list.innerHTML=window.xzState.products.map(function(p){return xzRenderProductCard(p);}).join('');
}

function xzRenderProductCard(p){
	var c=xzCalcProduct(p);
	var vatAmt=c.sellingPrice*(xzN(window.xzState.settings.vatPct)/100);
	var s=window.xzState.settings;
	function matRow(m,updFn,remFn,sec){
		var rate=xzGetMatRate(m);
		return '<tr><td><input value="'+(m.description||'')+'" placeholder="Description" oninput="'+updFn+'(\''+p.id+'\',\''+m.id+'\',\'description\',this.value)"></td>'+
			'<td style="width:80px"><input type="number" value="'+(m.qty||1)+'" min="0" step="0.01" oninput="'+updFn+'(\''+p.id+'\',\''+m.id+'\',\'qty\',this.value)"></td>'+
			'<td style="width:65px"><input value="'+(m.unit||'')+'" oninput="'+updFn+'(\''+p.id+'\',\''+m.id+'\',\'unit\',this.value)"></td>'+
			'<td style="width:100px"><input type="number" value="'+(m.libId?rate:(m.rate||0))+'" '+(m.libId?'readonly style="background:#EDE8E0;color:#516C60"':'')+' min="0" step="0.01" oninput="'+updFn+'(\''+p.id+'\',\''+m.id+'\',\'rate\',this.value)"></td>'+
			'<td style="width:90px" class="xznum"><strong>'+xzFmt(xzN(m.qty||1)*rate)+'</strong></td>'+
			'<td style="width:80px;white-space:nowrap">'+(m.libId?'<span class="xzpill xzpill-emerald" style="font-size:10px">linked</span>':'')+
			' <button class="xzbtn xzbtn-ghost xzbtn-xs" onclick="xzOpenLibPicker(\''+p.id+'\',\''+sec+'\',\''+m.id+'\')">Lib</button>'+
			' <button class="xzbtn xzbtn-danger xzbtn-xs" onclick="'+remFn+'(\''+p.id+'\',\''+m.id+'\')">X</button></td></tr>';
	}
	var matRows=(p.materials||[]).map(function(m){return matRow(m,'xzUpdMat','xzRemoveMat','materials');}).join('');
	var uphRows=(p.upholstery||[]).map(function(m){return matRow(m,'xzUpdUph','xzRemoveUph','upholstery');}).join('');
	var finRows=(p.finishing||[]).map(function(m){return matRow(m,'xzUpdFin','xzRemoveFin','finishing');}).join('');
	var mpRows=(p.manpower||[]).map(function(l){
		var def=xzN((s.laborRates||{})[l.type]||15);var rate=l.rate!=null?xzN(l.rate):def;
		return '<tr><td style="width:150px"><select onchange="xzUpdLabour(\''+p.id+'\',\''+l.id+'\',\'type\',this.value)">'+
			XZ_LABOUR_TYPES.map(function(t){return '<option '+(t===l.type?'selected':'')+'>'+t+'</option>';}).join('')+'</select></td>'+
			'<td><input value="'+(l.notes||'')+'" placeholder="Notes" oninput="xzUpdLabour(\''+p.id+'\',\''+l.id+'\',\'notes\',this.value)"></td>'+
			'<td style="width:90px"><input type="number" value="'+(l.hours||0)+'" min="0" step="0.5" oninput="xzUpdLabour(\''+p.id+'\',\''+l.id+'\',\'hours\',this.value)"></td>'+
			'<td style="width:100px"><input type="number" value="'+rate+'" min="0" step="0.5" oninput="xzUpdLabour(\''+p.id+'\',\''+l.id+'\',\'rate\',this.value)"></td>'+
			'<td style="width:90px" class="xznum"><strong>'+xzFmt(xzN(l.hours)*rate)+'</strong></td>'+
			'<td style="width:50px"><button class="xzbtn xzbtn-danger xzbtn-xs" onclick="xzRemoveLabour(\''+p.id+'\',\''+l.id+'\')">X</button></td></tr>';
	}).join('');

	var mainCats=Object.keys(XZ_CATEGORIES);
	var subCats=p.mainCategory&&XZ_CATEGORIES[p.mainCategory]?Object.keys(XZ_CATEGORIES[p.mainCategory].subs):[];
	var ohVal=p.overheadPct!=null?p.overheadPct:s.overheadPct;
	var prVal=p.profitPct!=null?p.profitPct:s.profitPct;

	return '<div class="xzproduct-item" id="xz-prod-'+p.id+'">'+
	'<div class="xzproduct-item-header" onclick="xzToggleProduct(\''+p.id+'\')">'+
	'<div><div class="xzproduct-item-name">'+(p.name||'Unnamed Product')+'</div>'+
	'<div class="xzproduct-item-cat">'+(p.mainCategory?p.mainCategory+(p.subCategory?' &gt; '+p.subCategory:''):'<span style="color:#bbb">No category</span>')+
	(p.sku?' <span style="font-family:monospace;font-size:10px;font-weight:700;color:#516C60;background:rgba(81,108,96,.1);padding:2px 7px;border-radius:20px">'+p.sku+'</span>':'')+
	'</div></div>'+
	'<div style="margin-left:auto;margin-right:16px;text-align:right"><div style="font-size:11px;color:#58595B">Selling Price</div>'+
	'<div class="xzproduct-item-sp">'+xzCur()+' '+xzFmt(c.sellingPrice)+'</div>'+
	'<div style="font-size:11px;color:#58595B">+VAT: '+xzCur()+' '+xzFmt(c.sellingPrice+vatAmt)+'</div></div>'+
	'<button class="xzbtn xzbtn-danger xzbtn-sm no-print" style="margin-right:4px" onclick="event.stopPropagation();xzDeleteProduct(\''+p.id+'\')">Delete</button>'+
	'<span style="color:#58595B;font-size:18px;line-height:1">&#9662;</span></div>'+
	'<div class="xzproduct-item-body">'+
	'<div style="display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:16px">'+
	'<div class="xzform-row cols-3"><div class="xzform-group"><label>Product Name</label><input type="text" value="'+(p.name||'')+'" oninput="xzUpdProd(\''+p.id+'\',\'name\',this.value)"></div>'+
	'<div class="xzform-group"><label>Main Category</label><select onchange="xzUpdProd(\''+p.id+'\',\'mainCategory\',this.value);xzRenderProducts()"><option value="">— Select —</option>'+
	mainCats.map(function(m){return '<option value="'+m+'" '+(m===p.mainCategory?'selected':'')+'>'+m+'</option>';}).join('')+'</select></div>'+
	'<div class="xzform-group"><label>Sub-Category</label><select onchange="xzUpdProd(\''+p.id+'\',\'subCategory\',this.value)"><option value="">— Select —</option>'+
	subCats.map(function(sc){return '<option value="'+sc+'" '+(sc===p.subCategory?'selected':'')+'>'+sc+'</option>';}).join('')+'</select></div></div>'+
	'<div class="xzform-row cols-3"><div class="xzform-group"><label>SKU</label><input type="text" value="'+(p.sku||'')+'" oninput="xzUpdProd(\''+p.id+'\',\'sku\',this.value)" style="font-family:monospace;font-size:12px;color:#516C60;font-weight:700"></div>'+
	'<div class="xzform-group"><label>Collection</label><input type="text" value="'+(p.collection||'')+'" oninput="xzUpdProd(\''+p.id+'\',\'collection\',this.value)"></div>'+
	'<div class="xzform-group"><label>Quote Qty</label><input type="number" value="'+(p.quoteQty||1)+'" min="1" oninput="xzUpdProd(\''+p.id+'\',\'quoteQty\',this.value)"></div></div>'+
	'<div class="xzform-group"><label>Custom Overhead % (blank = global '+s.overheadPct+'%)</label><input type="number" value="'+(p.overheadPct!=null?p.overheadPct:'')+'" placeholder="'+s.overheadPct+'" min="0" oninput="xzUpdProdPct(\''+p.id+'\',\'overheadPct\',this.value)" style="max-width:200px"></div>'+
	'<div class="xzform-group"><label>Custom Profit % (blank = global '+s.profitPct+'%)</label><input type="number" value="'+(p.profitPct!=null?p.profitPct:'')+'" placeholder="'+s.profitPct+'" min="0" oninput="xzUpdProdPct(\''+p.id+'\',\'profitPct\',this.value)" style="max-width:200px"></div>'+
	'</div>'+
	'<div class="xzprod-section"><div class="xzprod-section-head"><span>Frame Materials</span><span class="xzsection-total">'+xzCur()+' '+xzFmt(c.materialsCost)+'</span>'+
	'<button class="xzbtn xzbtn-ghost xzbtn-xs" onclick="xzAddMat(\''+p.id+'\')">+ Row</button>'+
	'<button class="xzbtn xzbtn-outline xzbtn-xs" onclick="xzOpenLibPicker(\''+p.id+'\',\'materials\',null)">+ Library</button></div>'+
	'<div class="xztable-wrap"><table><thead><tr><th>Description</th><th>Qty</th><th>Unit</th><th>Rate</th><th>Total</th><th></th></tr></thead><tbody>'+
	(matRows||'<tr><td colspan="6" class="xztext-center xztext-grey xztext-sm" style="padding:12px">No materials</td></tr>')+'</tbody></table></div></div>'+
	'<div class="xzprod-section"><div class="xzprod-section-head"><span>Upholstery & Fabric</span><span class="xzsection-total">'+xzCur()+' '+xzFmt(c.upholsteryCost)+'</span>'+
	'<button class="xzbtn xzbtn-ghost xzbtn-xs" onclick="xzAddUph(\''+p.id+'\')">+ Row</button>'+
	'<button class="xzbtn xzbtn-outline xzbtn-xs" onclick="xzOpenLibPicker(\''+p.id+'\',\'upholstery\',null)">+ Library</button></div>'+
	'<div class="xztable-wrap"><table><thead><tr><th>Description</th><th>Qty</th><th>Unit</th><th>Rate</th><th>Total</th><th></th></tr></thead><tbody>'+
	(uphRows||'<tr><td colspan="6" class="xztext-center xztext-grey xztext-sm" style="padding:12px">No upholstery</td></tr>')+'</tbody></table></div></div>'+
	'<div class="xzprod-section"><div class="xzprod-section-head"><span>Finishing & Paint</span><span class="xzsection-total">'+xzCur()+' '+xzFmt(c.finishingCost)+'</span>'+
	'<button class="xzbtn xzbtn-ghost xzbtn-xs" onclick="xzAddFin(\''+p.id+'\')">+ Row</button>'+
	'<button class="xzbtn xzbtn-outline xzbtn-xs" onclick="xzOpenLibPicker(\''+p.id+'\',\'finishing\',null)">+ Library</button></div>'+
	'<div class="xztable-wrap"><table><thead><tr><th>Description</th><th>Qty</th><th>Unit</th><th>Rate</th><th>Total</th><th></th></tr></thead><tbody>'+
	(finRows||'<tr><td colspan="6" class="xztext-center xztext-grey xztext-sm" style="padding:12px">No finishing</td></tr>')+'</tbody></table></div></div>'+
	'<div class="xzprod-section"><div class="xzprod-section-head"><span>Manpower</span><span class="xzsection-total">'+xzCur()+' '+xzFmt(c.manpowerCost)+'</span>'+
	'<button class="xzbtn xzbtn-ghost xzbtn-xs" onclick="xzAddLabour(\''+p.id+'\')">+ Labour</button></div>'+
	'<div class="xztable-wrap"><table><thead><tr><th>Type</th><th>Notes</th><th>Hours</th><th>Rate/hr</th><th>Total</th><th></th></tr></thead><tbody>'+
	(mpRows||'<tr><td colspan="6" class="xztext-center xztext-grey xztext-sm" style="padding:12px">No manpower</td></tr>')+'</tbody></table></div></div>'+
	'<div class="xzprod-section"><div class="xzprod-section-head"><span>Misc Consumables</span><span class="xzsection-total">'+xzCur()+' '+xzFmt(c.miscCost)+'</span></div>'+
	'<div class="xzform-row" style="margin-top:8px;max-width:320px"><div class="xzform-group"><label>Amount</label><input type="number" value="'+((p.misc||{}).miscConsumables||0)+'" min="0" oninput="xzUpdMisc(\''+p.id+'\',\'miscConsumables\',this.value)"></div></div></div>'+
	'<div style="margin-top:16px;background:#F5F0EA;border-radius:4px;padding:16px"><div class="xzsection-title">Cost Breakdown</div>'+
	'<table class="xzbreakdown-table">'+
	'<tr><td class="bd-label">Frame Materials</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.materialsCost)+'</td></tr>'+
	'<tr><td class="bd-label">Upholstery</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.upholsteryCost)+'</td></tr>'+
	'<tr><td class="bd-label">Finishing</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.finishingCost)+'</td></tr>'+
	'<tr><td class="bd-label">Manpower</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.manpowerCost)+'</td></tr>'+
	'<tr><td class="bd-label">Misc</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.miscCost)+'</td></tr>'+
	'<tr class="bd-total"><td><strong>Direct Cost</strong></td><td class="bd-val">'+xzCur()+' '+xzFmt(c.directCost)+'</td></tr>'+
	'<tr><td class="bd-label">Overhead ('+(c.ohPct*100).toFixed(0)+'%)</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.overhead)+'</td></tr>'+
	'<tr><td class="bd-label">Profit ('+(c.profPct*100).toFixed(0)+'%)</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.profit)+'</td></tr>'+
	(c.installCost>0?'<tr><td class="bd-label">Installation</td><td class="bd-val">'+xzCur()+' '+xzFmt(c.installCost)+'</td></tr>':'')+
	'<tr class="bd-sp"><td><strong>Selling Price</strong></td><td class="bd-val"><strong>'+xzCur()+' '+xzFmt(c.sellingPrice)+'</strong></td></tr></table></div>'+
	'</div></div>';
}

function xzToggleProduct(id){var e=document.getElementById('xz-prod-'+id);if(e)e.classList.toggle('expanded');}
function xzDeleteProduct(id){if(!confirm('Delete this product?'))return;window.xzState.products=window.xzState.products.filter(function(p){return p.id!==id;});xzSaveState();xzRenderProducts();}
function xzUpdProd(pid,field,val){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;p[field]=val;xzSaveState();}
function xzUpdProdPct(pid,field,val){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;p[field]=val===''?null:xzN(val);xzSaveState();xzRenderProducts();xzToggleProduct(pid);}

// Material CRUD
function xzAddMat(pid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;if(!p.materials)p.materials=[];p.materials.push({id:xzUid(),libId:null,description:'',qty:1,unit:'Sheet',rate:0});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}
function xzUpdMat(pid,mid,f,v){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;var m=(p.materials||[]).find(function(x){return x.id===mid;});if(!m)return;if(f==='qty'||f==='rate')m[f]=xzN(v);else m[f]=v;xzSaveState();}
function xzRemoveMat(pid,mid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;p.materials=(p.materials||[]).filter(function(x){return x.id!==mid;});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}

// Upholstery CRUD
function xzAddUph(pid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;if(!p.upholstery)p.upholstery=[];p.upholstery.push({id:xzUid(),libId:null,description:'',qty:1,unit:'m',rate:0});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}
function xzUpdUph(pid,mid,f,v){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;var m=(p.upholstery||[]).find(function(x){return x.id===mid;});if(!m)return;if(f==='qty'||f==='rate')m[f]=xzN(v);else m[f]=v;xzSaveState();}
function xzRemoveUph(pid,mid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;p.upholstery=(p.upholstery||[]).filter(function(x){return x.id!==mid;});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}

// Finishing CRUD
function xzAddFin(pid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;if(!p.finishing)p.finishing=[];p.finishing.push({id:xzUid(),libId:null,description:'',qty:1,unit:'L',rate:0});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}
function xzUpdFin(pid,mid,f,v){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;var m=(p.finishing||[]).find(function(x){return x.id===mid;});if(!m)return;if(f==='qty'||f==='rate')m[f]=xzN(v);else m[f]=v;xzSaveState();}
function xzRemoveFin(pid,mid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;p.finishing=(p.finishing||[]).filter(function(x){return x.id!==mid;});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}

// Labour CRUD
function xzAddLabour(pid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;if(!p.manpower)p.manpower=[];p.manpower.push({id:xzUid(),type:'Carpentry',notes:'',hours:4,rate:null,description:'Carpentry'});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}
function xzUpdLabour(pid,lid,f,v){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;var l=(p.manpower||[]).find(function(x){return x.id===lid;});if(!l)return;if(f==='hours')l[f]=xzN(v);else if(f==='rate')l[f]=v===''?null:xzN(v);else l[f]=v;xzSaveState();}
function xzRemoveLabour(pid,lid){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;p.manpower=(p.manpower||[]).filter(function(x){return x.id!==lid;});xzSaveState();xzRenderProducts();xzToggleProduct(pid);}

// Misc
function xzUpdMisc(pid,f,v){var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;if(!p.misc)p.misc={};p.misc[f]=xzN(v);xzSaveState();xzRenderProducts();xzToggleProduct(pid);}

/* ═══════════════════════════════════════════════════════════════
   MATERIALS LIBRARY
   ═══════════════════════════════════════════════════════════════ */
var _xzMatFilter='All';
function xzRenderMaterials(){
	var types=xzGetMatTypes();
	var chips=document.getElementById('xz-mat-chips');
	var all=['All'].concat(types);
	if(chips) chips.innerHTML=all.map(function(t){return '<div class="xzchip '+(_xzMatFilter===t?'active':'')+'" onclick="xzSetMatFilter(\''+t+'\')">'+t+'</div>';}).join('');
	var rows=document.getElementById('xz-mat-rows');
	var items=window.xzState.materialsLibrary;
	if(_xzMatFilter!=='All') items=items.filter(function(m){return m.type===_xzMatFilter;});
	if(rows) rows.innerHTML=items.map(function(m,i){
		return '<tr><td>'+(i+1)+'</td><td><input value="'+(m.name||'')+'" oninput="xzUpdLib(\''+m.id+'\',\'name\',this.value)"></td>'+
		'<td><select onchange="xzUpdLib(\''+m.id+'\',\'type\',this.value)">'+types.map(function(t){return '<option '+(t===m.type?'selected':'')+'>'+t+'</option>';}).join('')+'</select></td>'+
		'<td><input value="'+(m.unit||'')+'" style="width:70px" oninput="xzUpdLib(\''+m.id+'\',\'unit\',this.value)"></td>'+
		'<td><input type="number" value="'+(m.rate||0)+'" min="0" step="0.01" style="width:90px" oninput="xzUpdLib(\''+m.id+'\',\'rate\',this.value)"></td>'+
		'<td><input value="'+(m.supplier||'')+'" oninput="xzUpdLib(\''+m.id+'\',\'supplier\',this.value)"></td>'+
		'<td><input value="'+(m.notes||'')+'" oninput="xzUpdLib(\''+m.id+'\',\'notes\',this.value)"></td>'+
		'<td><button class="xzbtn xzbtn-danger xzbtn-xs" onclick="xzRemoveLib(\''+m.id+'\')">X</button></td></tr>';
	}).join('');
}
function xzSetMatFilter(f){_xzMatFilter=f;xzRenderMaterials();}
function xzAddLibItem(){window.xzState.materialsLibrary.push({id:xzUid(),name:'New Material',type:'Wood',unit:'Sheet',rate:0,supplier:'',notes:''});xzSaveState();xzRenderMaterials();}
function xzUpdLib(id,f,v){var m=window.xzState.materialsLibrary.find(function(x){return x.id===id;});if(!m)return;if(f==='rate')m[f]=xzN(v);else m[f]=v;xzSaveState();}
function xzRemoveLib(id){if(!confirm('Remove this material?'))return;window.xzState.materialsLibrary=window.xzState.materialsLibrary.filter(function(x){return x.id!==id;});xzSaveState();xzRenderMaterials();}

/* ═══════════════════════════════════════════════════════════════
   LIBRARY PICKER
   ═══════════════════════════════════════════════════════════════ */
var _xzLpCtx={pid:null,section:null,rowId:null,filter:'All'};
function xzOpenLibPicker(pid,sec,rowId){_xzLpCtx={pid:pid,section:sec,rowId:rowId,filter:'All'};xzRenderLibPicker();document.getElementById('xz-lib-overlay').classList.add('open');}
function xzCloseLibPicker(){document.getElementById('xz-lib-overlay').classList.remove('open');}
function xzRenderLibPicker(){
	var chips=document.getElementById('xz-lib-chips');
	var all=['All'].concat(xzGetMatTypes());
	if(chips) chips.innerHTML=all.map(function(t){return '<div class="xzchip '+(_xzLpCtx.filter===t?'active':'')+'" onclick="xzLpFilter(\''+t+'\')">'+t+'</div>';}).join('');
	var items=window.xzState.materialsLibrary;
	if(_xzLpCtx.filter!=='All') items=items.filter(function(m){return m.type===_xzLpCtx.filter;});
	var rows=document.getElementById('xz-lib-rows');
	if(rows) rows.innerHTML=items.map(function(m){
		return '<tr><td>'+m.name+'</td><td><span class="xzpill xzpill-grey">'+m.type+'</span></td><td>'+m.unit+'</td><td class="xznum">'+xzFmt(m.rate)+'</td><td>'+(m.supplier||'—')+'</td>'+
		'<td><button class="xzbtn xzbtn-primary xzbtn-xs" onclick="xzPickLibItem(\''+m.id+'\')">Select</button></td></tr>';
	}).join('');
}
function xzLpFilter(f){_xzLpCtx.filter=f;xzRenderLibPicker();}
function xzPickLibItem(libId){
	var pid=_xzLpCtx.pid,section=_xzLpCtx.section,rowId=_xzLpCtx.rowId;
	var p=window.xzState.products.find(function(x){return x.id===pid;});if(!p)return;
	var lib=window.xzState.materialsLibrary.find(function(x){return x.id===libId;});if(!lib)return;
	var arr=section==='materials'?p.materials:section==='finishing'?p.finishing:p.upholstery;
	if(rowId&&rowId!=='null'){
		var row=arr.find(function(x){return x.id===rowId;});
		if(row){row.libId=libId;row.description=lib.name;row.unit=lib.unit;row.rate=null;}
	}else{arr.push({id:xzUid(),libId:libId,description:lib.name,qty:1,unit:lib.unit,rate:null});}
	xzSaveState();xzCloseLibPicker();xzRenderProducts();setTimeout(function(){xzToggleProduct(pid);},50);
}

/* ═══════════════════════════════════════════════════════════════
   MACHINES
   ═══════════════════════════════════════════════════════════════ */
function xzRenderMachines(){
	var rows=document.getElementById('xz-machine-rows');
	if(!rows)return;
	rows.innerHTML=window.xzState.machines.map(function(m,i){
		return '<tr><td>'+(i+1)+'</td><td><input value="'+(m.name||'')+'" oninput="xzUpdMachineLib(\''+m.id+'\',\'name\',this.value)"></td>'+
		'<td><input type="number" value="'+(m.hourlyRate||0)+'" min="0" step="0.5" style="width:100px" oninput="xzUpdMachineLib(\''+m.id+'\',\'hourlyRate\',this.value)"></td>'+
		'<td><input value="'+(m.notes||'')+'" oninput="xzUpdMachineLib(\''+m.id+'\',\'notes\',this.value)"></td>'+
		'<td><button class="xzbtn xzbtn-danger xzbtn-xs" onclick="xzRemoveMachineLib(\''+m.id+'\')">X</button></td></tr>';
	}).join('');
}
function xzAddMachine(){window.xzState.machines.push({id:xzUid(),name:'New Machine',hourlyRate:30,notes:''});xzSaveState();xzRenderMachines();}
function xzUpdMachineLib(id,f,v){var m=window.xzState.machines.find(function(x){return x.id===id;});if(!m)return;if(f==='hourlyRate')m[f]=xzN(v);else m[f]=v;xzSaveState();}
function xzRemoveMachineLib(id){if(!confirm('Remove?'))return;window.xzState.machines=window.xzState.machines.filter(function(x){return x.id!==id;});xzSaveState();xzRenderMachines();}

/* ═══════════════════════════════════════════════════════════════
   CONTROL CENTER
   ═══════════════════════════════════════════════════════════════ */
function xzRenderControl(){
	var s=window.xzState.settings,c=s.company||{};
	var el=function(id){return document.getElementById(id);};
	if(el('xz-cc-currency'))el('xz-cc-currency').value=s.currency||'AED';
	if(el('xz-cc-vat'))el('xz-cc-vat').value=xzN(s.vatPct);
	if(el('xz-cc-overhead'))el('xz-cc-overhead').value=xzN(s.overheadPct);
	if(el('xz-cc-profit'))el('xz-cc-profit').value=xzN(s.profitPct);
	if(el('xz-cc-install'))el('xz-cc-install').value=xzN(s.installationRate);
	if(el('xz-cc-cname'))el('xz-cc-cname').value=c.name||'';
	if(el('xz-cc-cphone'))el('xz-cc-cphone').value=c.phone||'';
	if(el('xz-cc-cemail'))el('xz-cc-cemail').value=c.email||'';
	if(el('xz-cc-cweb'))el('xz-cc-cweb').value=c.website||'';
	if(el('xz-cc-ctrade'))el('xz-cc-ctrade').value=c.tradeLicense||'';
	if(el('xz-cc-caddr'))el('xz-cc-caddr').value=c.address||'';
	if(el('xz-cc-leadtime'))el('xz-cc-leadtime').value=s.leadTime||'';
	if(el('xz-cc-validity'))el('xz-cc-validity').value=s.validity||'';
	if(el('xz-cc-payterms'))el('xz-cc-payterms').value=s.paymentTerms||'';
	if(el('xz-cc-tandc'))el('xz-cc-tandc').value=s.termsAndConditions||'';
	var lgrid=el('xz-labour-rates-grid');
	if(lgrid)lgrid.innerHTML=XZ_LABOUR_TYPES.map(function(t){
		return '<div class="xzform-group"><label>'+t+'</label><input type="number" value="'+xzN((s.laborRates||{})[t]||15)+'" min="0" step="0.5" onchange="xzUpdLabourRate(\''+t+'\',this.value)"></div>';
	}).join('');
	xzRenderPaySchedule();
}
function xzRenderPaySchedule(){
	var el=document.getElementById('xz-pay-schedule-rows');if(!el)return;
	var sched=window.xzState.settings.paySchedule||[];
	el.innerHTML=sched.map(function(s,i){
		return '<div class="xzflex xzgap-8" style="margin-bottom:8px;align-items:center"><div class="xzform-group" style="flex:2"><input type="text" value="'+(s.label||'')+'" placeholder="Stage name" oninput="xzUpdPaySched('+i+',\'label\',this.value)"></div>'+
		'<div class="xzform-group" style="width:80px"><input type="number" value="'+(s.pct||0)+'" min="0" max="100" oninput="xzUpdPaySched('+i+',\'pct\',this.value)"></div>'+
		'<span style="font-size:13px;color:#58595B">%</span>'+
		'<button class="xzbtn xzbtn-danger xzbtn-xs" onclick="xzRemovePaySched('+i+')">X</button></div>';
	}).join('');
}
function xzAddPaySchedule(){if(!window.xzState.settings.paySchedule)window.xzState.settings.paySchedule=[];window.xzState.settings.paySchedule.push({label:'Stage',pct:0});xzSaveState();xzRenderPaySchedule();}
function xzUpdPaySched(i,f,v){if(!window.xzState.settings.paySchedule)return;if(f==='pct')window.xzState.settings.paySchedule[i][f]=xzN(v);else window.xzState.settings.paySchedule[i][f]=v;xzSaveState();}
function xzRemovePaySched(i){window.xzState.settings.paySchedule.splice(i,1);xzSaveState();xzRenderPaySchedule();}
function xzUpdLabourRate(type,val){if(!window.xzState.settings.laborRates)window.xzState.settings.laborRates={};window.xzState.settings.laborRates[type]=xzN(val);xzSaveState();}
function xzCtrlSave(){
	var s=window.xzState.settings;if(!s.company)s.company={};
	var el=function(id){return document.getElementById(id);};
	s.currency=el('xz-cc-currency')?el('xz-cc-currency').value:'AED';
	s.vatPct=xzN(el('xz-cc-vat')?el('xz-cc-vat').value:5);
	s.overheadPct=xzN(el('xz-cc-overhead')?el('xz-cc-overhead').value:20);
	s.profitPct=xzN(el('xz-cc-profit')?el('xz-cc-profit').value:150);
	s.installationRate=xzN(el('xz-cc-install')?el('xz-cc-install').value:15);
	s.company.name=el('xz-cc-cname')?el('xz-cc-cname').value:'';
	s.company.phone=el('xz-cc-cphone')?el('xz-cc-cphone').value:'';
	s.company.email=el('xz-cc-cemail')?el('xz-cc-cemail').value:'';
	s.company.website=el('xz-cc-cweb')?el('xz-cc-cweb').value:'';
	s.company.tradeLicense=el('xz-cc-ctrade')?el('xz-cc-ctrade').value:'';
	s.company.address=el('xz-cc-caddr')?el('xz-cc-caddr').value:'';
	s.leadTime=el('xz-cc-leadtime')?el('xz-cc-leadtime').value:'';
	s.validity=el('xz-cc-validity')?el('xz-cc-validity').value:'';
	s.paymentTerms=el('xz-cc-payterms')?el('xz-cc-payterms').value:'';
	s.termsAndConditions=el('xz-cc-tandc')?el('xz-cc-tandc').value:'';
	xzSaveState();
	var nav=document.getElementById('xz-nav-currency');if(nav)nav.textContent=s.currency;
}

/* ═══════════════════════════════════════════════════════════════
   QUOTE BUILDER
   ═══════════════════════════════════════════════════════════════ */
function xzRenderQuote(){
	var q=window.xzState.quote,s=window.xzState.settings;
	var el=function(id){return document.getElementById(id);};
	if(el('xz-q-client'))el('xz-q-client').value=q.clientName||'';
	if(el('xz-q-project'))el('xz-q-project').value=q.project||'';
	if(el('xz-q-ref'))el('xz-q-ref').value=q.ref||'';
	if(el('xz-q-by'))el('xz-q-by').value=q.preparedBy||'';
	if(el('xz-q-date'))el('xz-q-date').value=q.date||new Date().toISOString().split('T')[0];
	if(el('xz-q-disc'))el('xz-q-disc').value=q.discountPct||0;
	var picker=el('xz-q-product-picker');
	if(picker) picker.innerHTML=(window.xzState.products||[]).map(function(p){
		var sel=(q.productIds||[]).indexOf(p.id)!==-1;
		var c=xzCalcProduct(p);
		return '<label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:'+(sel?'rgba(36,54,43,.06)':'#F5F0EA')+';border-radius:4px;margin-bottom:6px;cursor:pointer;border:1.5px solid '+(sel?'#24362B':'#DDD7CC')+'">'+
			'<input type="checkbox" '+(sel?'checked':'')+' onchange="xzToggleQProduct(\''+p.id+'\',this.checked)" style="width:16px;height:16px;accent-color:#24362B">'+
			'<span style="flex:1;font-weight:600">'+(p.name||'Unnamed')+'</span>'+
			'<span style="font-weight:700;color:#24362B">'+xzCur()+' '+xzFmt(c.sellingPrice)+'</span></label>';
	}).join('')||'<p class="xztext-grey xztext-sm">No products</p>';
	xzRenderQuotePreview();
}
function xzQSave(){
	var q=window.xzState.quote;var el=function(id){return document.getElementById(id);};
	q.clientName=el('xz-q-client')?el('xz-q-client').value:'';
	q.project=el('xz-q-project')?el('xz-q-project').value:'';
	q.ref=el('xz-q-ref')?el('xz-q-ref').value:'';
	q.preparedBy=el('xz-q-by')?el('xz-q-by').value:'';
	q.date=el('xz-q-date')?el('xz-q-date').value:'';
	q.discountPct=xzN(el('xz-q-disc')?el('xz-q-disc').value:0);
	xzSaveState();xzRenderQuotePreview();
}
function xzToggleQProduct(pid,checked){
	var q=window.xzState.quote;if(!q.productIds)q.productIds=[];
	if(checked){if(q.productIds.indexOf(pid)===-1)q.productIds.push(pid);}
	else{q.productIds=q.productIds.filter(function(x){return x!==pid;});}
	xzSaveState();xzRenderQuote();
}
function xzRenderQuotePreview(){
	var q=window.xzState.quote,s=window.xzState.settings,c=s.company||{};
	var vatPct=xzN(s.vatPct)/100,discPct=xzN(q.discountPct)/100;
	var sel=((q.productIds||[]).map(function(id){return window.xzState.products.find(function(p){return p.id===id;});})).filter(Boolean);
	var subtotal=0;
	var itemRows=sel.map(function(p,i){
		var calc=xzCalcProduct(p);var qty=xzN(p.quoteQty)||1;var lt=calc.sellingPrice*qty;subtotal+=lt;
		return '<tr><td>'+(i+1)+'</td><td><strong>'+(p.name||'—')+'</strong></td><td style="text-align:center">'+qty+'</td>'+
			'<td style="text-align:center">'+(p.quoteUnit||'Nos')+'</td><td style="text-align:right">'+xzCur()+' '+xzFmt(calc.sellingPrice)+'</td>'+
			'<td style="text-align:right"><strong>'+xzCur()+' '+xzFmt(lt)+'</strong></td></tr>';
	}).join('');
	var discountAmt=subtotal*discPct,afterDisc=subtotal-discountAmt,vatAmt=afterDisc*vatPct,grandTotal=afterDisc+vatAmt;
	var dateStr=q.date?new Date(q.date).toLocaleDateString('en-AE',{day:'2-digit',month:'long',year:'numeric'}):new Date().toLocaleDateString('en-AE',{day:'2-digit',month:'long',year:'numeric'});
	var paySched=s.paySchedule||[];
	var payBlocks=paySched.map(function(ps){return '<div class="xzqp-payment-item"><div class="xzqp-payment-pct">'+ps.pct+'%</div><div style="font-size:11px;color:#58595B">'+ps.label+'</div><div style="font-size:12px;font-weight:600;color:#24362B;margin-top:4px">'+xzCur()+' '+xzFmt(grandTotal*xzN(ps.pct)/100)+'</div></div>';}).join('');
	var tcLines=(s.termsAndConditions||'').split('\n').filter(function(x){return x.trim();});
	var tcHTML=tcLines.map(function(l){return '<li>'+l+'</li>';}).join('');
	var wrap=document.getElementById('xz-quote-preview-wrap');
	if(!wrap)return;
	wrap.innerHTML='<div class="xzcard" style="margin-top:20px"><div class="xzqp-header"><div><div class="xzqp-logo">xzpace<span>.</span></div>'+
		'<div style="color:rgba(255,255,255,.65);font-size:11px;margin-top:4px">'+(c.address||'')+'</div></div>'+
		'<div style="text-align:right;color:rgba(255,255,255,.8);font-size:12px;line-height:1.7"><strong style="color:#fff;font-size:13px">QUOTATION</strong><br>'+
		(q.ref?'Ref: '+q.ref+'<br>':'')+'Date: '+dateStr+'<br>'+(s.validity?'Valid for: '+s.validity+'<br>':'')+
		(q.preparedBy?'Prepared by: '+q.preparedBy:'')+'</div></div>'+
		'<div class="xzqp-body"><div style="margin-bottom:24px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#58595B;margin-bottom:4px">Prepared for</div>'+
		'<div class="xzqp-client-name">'+(q.clientName||'—')+'</div><div style="font-size:13px;color:#58595B">'+(q.project||'')+'</div></div>'+
		'<div class="xzqp-intro">Dear '+(q.clientName||'Client')+',<br><br>We are pleased to present our quotation for the '+(q.project||'project')+' as detailed below.</div>'+
		(sel.length>0?'<table class="xzqp-items-table"><thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Unit</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>'+itemRows+'</tbody></table>'+
		'<div class="xzqp-totals"><table><tr><td>Subtotal</td><td>'+xzCur()+' '+xzFmt(subtotal)+'</td></tr>'+
		(discountAmt>0?'<tr><td>Discount ('+q.discountPct+'%)</td><td>- '+xzCur()+' '+xzFmt(discountAmt)+'</td></tr>':'')+
		'<tr><td>VAT ('+xzN(s.vatPct)+'%)</td><td>'+xzCur()+' '+xzFmt(vatAmt)+'</td></tr>'+
		'<tr class="xzqp-grand"><td>Grand Total</td><td>'+xzCur()+' '+xzFmt(grandTotal)+'</td></tr></table></div>':'<p class="xztext-grey xztext-sm" style="padding:24px 0">No products selected.</p>')+
		(paySched.length>0?'<div style="margin-bottom:24px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#24362B;margin-bottom:10px">Payment Schedule</div><div class="xzqp-payment-items">'+payBlocks+'</div></div>':'')+
		(s.leadTime?'<div style="margin-bottom:20px;padding:12px 16px;background:#F5F0EA;border-radius:4px;font-size:13px"><strong style="color:#24362B">Lead Time:</strong> '+s.leadTime+'</div>':'')+
		(tcHTML?'<div style="background:#F5F0EA;border-radius:4px;padding:16px 20px;margin-bottom:24px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#24362B;margin-bottom:8px">Terms &amp; Conditions</div><ul style="list-style:none;padding:0">'+tcHTML+'</ul></div>':'')+
		'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:20px"><div style="text-align:center"><div style="width:160px;border-top:1.5px solid #DDD7CC;padding-top:6px;font-size:11px;color:#58595B">Client Signature</div></div>'+
		'<div style="text-align:center"><div style="width:80px;height:80px;border-radius:50%;border:3px solid #24362B;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#24362B;text-align:center;line-height:1.3;text-transform:uppercase">xzpace<br>Signatory</div></div>'+
		'<div style="text-align:center"><div style="width:160px;border-top:1.5px solid #DDD7CC;padding-top:6px;font-size:11px;color:#58595B">Date</div></div></div></div>'+
		'<div class="xzqp-footer"><div><div style="font-size:16px;font-weight:800;color:#24362B;letter-spacing:-1px">xzpace<span style="color:#C06044">.</span></div>'+(c.website?'<div style="font-size:11px;color:#516C60">'+c.website+'</div>':'')+'</div>'+
		'<div style="font-size:11px;color:#58595B;text-align:right;line-height:1.7">'+(c.phone?c.phone+'<br>':'')+(c.email?c.email+'<br>':'')+(c.tradeLicense?'TL# '+c.tradeLicense:'')+'</div></div></div>';
}
function xzExportPDF(){xzRenderQuotePreview();setTimeout(function(){$$('.xzpace-dashboard .no-print').forEach(function(el){el.style.display='none';});window.print();$$('.xzpace-dashboard .no-print').forEach(function(el){el.style.display='';});},200);}

/* ═══════════════════════════════════════════════════════════════
   CATALOG
   ═══════════════════════════════════════════════════════════════ */
function xzRenderCatalog(){
	var s=window.xzState.settings,c=s.company||{},vatPct=xzN(s.vatPct)/100;
	var products=(window.xzState.products||[]).filter(function(p){return p.active!==false;});
	var wrap=document.getElementById('xz-catalog-wrap');if(!wrap)return;
	var year=new Date().getFullYear();
	if(products.length===0){wrap.innerHTML='<div class="xzempty-state">No products. Add products first.</div>';return;}
	var pages=products.map(function(p,i){
		var calc=xzCalcProduct(p);var vatAmt=calc.sellingPrice*vatPct;
		var hD=p.dimH||'—',wD=p.dimW||'—',dD=p.dimD||'—';
		return '<div style="background:#fff;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.15);margin-bottom:24px;overflow:hidden">'+
			'<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #eee;background:#fafafa">'+
			'<div style="font-size:20px;font-weight:800;color:#171717">xzpace<span style="color:#C06044">.</span></div>'+
			'<div style="text-align:right;font-size:10px;color:#aaa">Product Sheet &bull; Page '+(i+1)+'/'+products.length+'</div></div>'+
			'<div style="padding:24px"><h2 style="font-size:24px;font-weight:800;color:#171717;margin-bottom:4px">'+(p.name||'Unnamed')+'</h2>'+
			(p.sku?'<div style="font-size:13px;color:#999;margin-bottom:16px">'+p.sku+'</div>':'')+
			'<div style="display:flex;gap:24px;margin-bottom:16px">'+
			(p.dimH||p.dimW||p.dimD?'<div style="display:flex;gap:16px"><div><div style="font-size:15px;font-weight:700">'+hD+' cm</div><div style="font-size:10px;color:#aaa;text-transform:uppercase">Height</div></div><div><div style="font-size:15px;font-weight:700">'+wD+' cm</div><div style="font-size:10px;color:#aaa;text-transform:uppercase">Width</div></div><div><div style="font-size:15px;font-weight:700">'+dD+' cm</div><div style="font-size:10px;color:#aaa;text-transform:uppercase">Depth</div></div></div>':'')+
			'</div>'+
			(p.clientDescription?'<p style="font-size:13px;color:#58595B;margin-bottom:16px">'+p.clientDescription+'</p>':'')+
			'<div style="background:#F5F0EA;border-radius:4px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between">'+
			'<div><div style="font-size:9px;font-weight:700;text-transform:uppercase;color:#aaa">Price (excl. VAT)</div><div style="font-size:24px;font-weight:800;color:#24362B">'+xzCur()+' '+xzFmt(calc.sellingPrice)+'</div></div>'+
			'<div style="text-align:right"><div style="font-size:11px;color:#aaa">incl. '+xzN(s.vatPct)+'% VAT: '+xzCur()+' '+xzFmt(calc.sellingPrice+vatAmt)+'</div></div></div>'+
			(p.care?'<div style="margin-top:12px;font-size:11px;color:#58595B"><strong>Care:</strong> '+p.care+'</div>':'')+
			'</div>'+
			'<div style="padding:12px 24px;border-top:1px solid #eee;background:#fafafa;display:flex;justify-content:space-between;font-size:11px;color:#666">'+
			'<div><strong>'+(c.name||'xzpace FZ LLC')+'</strong><br>'+(c.phone?c.phone+'<br>':'')+(c.website||'www.xzpace.com')+'</div>'+
			'<div style="color:#bbb;max-width:300px;text-align:right">Prices subject to change without notice. Printed colours may differ.</div></div></div>';
	}).join('');
	wrap.innerHTML=pages;
}
function xzExportCatalog(){xzRenderCatalog();setTimeout(function(){$$('.xzpace-dashboard .no-print').forEach(function(el){el.style.display='none';});window.print();$$('.xzpace-dashboard .no-print').forEach(function(el){el.style.display='';});},400);}
