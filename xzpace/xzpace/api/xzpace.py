import frappe
import json


@frappe.whitelist()
def load_state():
	try:
		data = frappe.db.get_single_value("XZ State", "state_json")
		if data:
			return json.loads(data)
	except Exception:
		pass
	return get_default_state()


@frappe.whitelist()
def save_state(state):
	if isinstance(state, str):
		state = json.loads(state)
	frappe.db.set_single_value("XZ State", "state_json", json.dumps(state))
	frappe.db.commit()
	return "ok"


@frappe.whitelist()
def seed_demo_data():
	try:
		if frappe.db.get_single_value("XZ State", "state_json"):
			return
	except Exception:
		pass
	state = get_default_state()
	frappe.db.set_single_value("XZ State", "state_json", json.dumps(state))
	frappe.db.commit()


def get_default_state():
	return {
		"settings": {
			"currency": "AED", "vatPct": 5, "overheadPct": 20, "profitPct": 150,
			"installationRate": 15, "customMatTypes": [],
			"laborRates": {
				"Carpentry": 16, "Painting": 16, "Installation": 15,
				"Metal Works": 15, "CNC Cut": 80, "Upholstery": 18, "Other": 15
			},
			"company": {
				"name": "xzpace FZ LLC", "address": "Ras Al Khaimah, UAE",
				"phone": "", "email": "", "website": "www.xzpace.com", "tradeLicense": ""
			},
			"paymentTerms": "60% Advance · 25% on Material Inspection · 15% on Delivery",
			"paySchedule": [
				{"label": "Advance", "pct": 60},
				{"label": "Material Inspection", "pct": 25},
				{"label": "Delivery", "pct": 15}
			],
			"leadTime": "25–30 working days from advance payment & drawing approvals",
			"validity": "10 Days from date of proposal",
			"termsAndConditions": "All prices are exclusive of VAT (5%).\nElectrical, water and service connections are excluded.\nVariations to agreed scope will be priced separately.\nxzpace retains ownership of all drawings and designs.\nProject timeline subject to client approvals and site readiness.\nAny damage during delivery reported within 24 hours.\nThis proposal is valid for the period stated above."
		},
		"materialsLibrary": _get_default_materials(),
		"machines": [
			{"id": "mc1", "name": "CNC Router", "hourlyRate": 80, "notes": ""},
			{"id": "mc2", "name": "Edge Bander", "hourlyRate": 35, "notes": ""},
			{"id": "mc3", "name": "Panel Saw", "hourlyRate": 25, "notes": ""},
			{"id": "mc4", "name": "MIG Welder", "hourlyRate": 30, "notes": ""},
			{"id": "mc5", "name": "Spray Booth", "hourlyRate": 40, "notes": ""},
			{"id": "mc6", "name": "Sewing Machine (Upholstery)", "hourlyRate": 20, "notes": ""}
		],
		"products": _get_default_products(),
		"quote": {
			"clientName": "", "project": "", "ref": "",
			"preparedBy": "", "date": "", "discountPct": 0, "productIds": []
		}
	}


def _get_default_materials():
	return [
		{"id":"m1","name":"MDF 6mm","type":"Wood","unit":"Sheet","rate":21,"supplier":"","notes":"Medium-density fibreboard 6mm"},
		{"id":"m2","name":"MDF 12mm","type":"Wood","unit":"Sheet","rate":42,"supplier":"","notes":"Medium-density fibreboard 12mm"},
		{"id":"m3","name":"MDF 18mm","type":"Wood","unit":"Sheet","rate":60,"supplier":"","notes":"Medium-density fibreboard 18mm"},
		{"id":"m4","name":"Bendy Ply 3mm (4x8 sheet)","type":"Wood","unit":"Sheet","rate":50,"supplier":"","notes":"Flexible plywood 3mm"},
		{"id":"m5","name":"Bendy Ply 5mm (4x8 sheet)","type":"Wood","unit":"Sheet","rate":76,"supplier":"","notes":"Flexible plywood 5mm"},
		{"id":"m6","name":"Okume Wood","type":"Wood","unit":"cft","rate":63,"supplier":"","notes":"African Okume hardwood"},
		{"id":"m7","name":"Beech Wood","type":"Wood","unit":"cft","rate":78,"supplier":"","notes":"European Beech hardwood"},
		{"id":"m8","name":"White Oak Veneer (Crown Cut)","type":"Wood","unit":"sqm","rate":23,"supplier":"","notes":"White Oak crown-cut veneer"},
		{"id":"m9","name":"Veneer Power Glue","type":"Wood","unit":"bag","rate":240,"supplier":"","notes":"High-bond contact adhesive powder"},
		{"id":"m10","name":"Rattan","type":"Wood","unit":"M","rate":15,"supplier":"","notes":"Natural rattan core"},
		{"id":"m11","name":"Solid White Oak Timber","type":"Wood","unit":"cft","rate":140,"supplier":"","notes":"Premium solid White Oak"},
		{"id":"m12","name":"Plywood 18mm Marine","type":"Wood","unit":"Sheet","rate":140,"supplier":"","notes":"Marine-grade plywood 18mm"},
		{"id":"m13","name":"Steel Flat Bar 40x4mm","type":"Metal","unit":"ML","rate":18,"supplier":"","notes":"Mild steel flat bar"},
		{"id":"m14","name":"Steel Tube 40x40x2mm","type":"Metal","unit":"ML","rate":22,"supplier":"","notes":"Square hollow section"},
		{"id":"m15","name":"Steel Round Bar 12mm","type":"Metal","unit":"ML","rate":14,"supplier":"","notes":"Mild steel round bar"},
		{"id":"m16","name":"Clear Tempered Glass 6mm","type":"Glass","unit":"Sqm","rate":180,"supplier":"Gulf Glass","notes":"Toughened clear float glass"},
		{"id":"m17","name":"Frosted Glass 6mm","type":"Glass","unit":"Sqm","rate":210,"supplier":"Gulf Glass","notes":"Acid-etched tempered glass"},
		{"id":"m18","name":"Marble — Black Marquina","type":"Glass","unit":"Sqm","rate":150,"supplier":"","notes":"Black Marquina marble slab"},
		{"id":"m19","name":"Mosaic Tiles","type":"Glass","unit":"Sqm","rate":240,"supplier":"","notes":"Glass or natural stone mosaic tiles"},
		{"id":"m20","name":"Primer","type":"Paint & Finish","unit":"drum (25kg)","rate":219,"supplier":"","notes":"Wood/MDF primer sealer"},
		{"id":"m21","name":"Gloss / Matt Paint","type":"Paint & Finish","unit":"drum (25kg)","rate":550,"supplier":"","notes":"Water-based or solvent topcoat"},
		{"id":"m22","name":"Sealer & Thinner","type":"Paint & Finish","unit":"L","rate":12.5,"supplier":"","notes":"Multi-purpose solvent thinner"},
		{"id":"m23","name":"Wood Stain","type":"Paint & Finish","unit":"gallon","rate":85,"supplier":"","notes":"Oil-based penetrating wood stain"},
		{"id":"m24","name":"Powder Coat Paint","type":"Paint & Finish","unit":"Kg","rate":35,"supplier":"","notes":"Thermosetting polymer coating for metal"},
		{"id":"m25","name":"Tile Grouting","type":"Paint & Finish","unit":"gallon","rate":85,"supplier":"","notes":"Cement-based grout for mosaic"},
		{"id":"m26","name":"Sika Bond & Sealer","type":"Paint & Finish","unit":"nos","rate":27,"supplier":"","notes":"Polyurethane adhesive and sealant"},
		{"id":"m27","name":"Marble Polishing Compound","type":"Paint & Finish","unit":"ml","rate":45,"supplier":"","notes":"Abrasive polishing paste for stone"},
		{"id":"m28","name":"Soft-Close Hinges","type":"Hardware","unit":"set","rate":2.2,"supplier":"","notes":"Concealed cup hinges with soft-close"},
		{"id":"m29","name":"Shelf Support Pins","type":"Hardware","unit":"nos","rate":0.02,"supplier":"","notes":"Metal shelf support pins 5mm"},
		{"id":"m30","name":"Push-to-Open Mechanism","type":"Hardware","unit":"pcs","rate":3,"supplier":"","notes":"Touch-latch push-to-open fitting"},
		{"id":"m31","name":"Soft-Close Drawer Runner","type":"Hardware","unit":"set","rate":15,"supplier":"","notes":"Full-extension ball-bearing drawer slide"},
		{"id":"m32","name":"Piano Hinge 1200mm","type":"Hardware","unit":"Pc","rate":22,"supplier":"","notes":"Continuous piano hinge"},
		{"id":"m33","name":"Concealed Hinge","type":"Hardware","unit":"Pc","rate":4,"supplier":"","notes":"Standard 35mm concealed cup hinge"},
		{"id":"m34","name":"Fabric — General","type":"Fabric","unit":"m","rate":30,"supplier":"","notes":"General upholstery fabric"},
		{"id":"m35","name":"Fabric — Linen","type":"Fabric","unit":"m","rate":65,"supplier":"Fabric World","notes":"Natural linen upholstery fabric"},
		{"id":"m36","name":"Fabric — Velvet","type":"Fabric","unit":"m","rate":120,"supplier":"Fabric World","notes":"Premium velvet upholstery"},
		{"id":"m37","name":"Wool Yarn / Fringe","type":"Fabric","unit":"pcs","rate":12,"supplier":"","notes":"Decorative wool yarn"},
		{"id":"m38","name":"Hard Foam 1cm (200x100)","type":"Foam & Upholstery","unit":"sheet","rate":10.5,"supplier":"","notes":"High-density firm foam 10mm"},
		{"id":"m39","name":"Hard Foam 3cm (200x100)","type":"Foam & Upholstery","unit":"sheet","rate":26.13,"supplier":"","notes":"High-density firm foam 30mm"},
		{"id":"m40","name":"Hard Foam 4cm (200x100)","type":"Foam & Upholstery","unit":"sheet","rate":42,"supplier":"","notes":"High-density firm foam 40mm"},
		{"id":"m41","name":"Medium Foam 5cm (200x100)","type":"Foam & Upholstery","unit":"sheet","rate":70,"supplier":"","notes":"Medium-density foam 50mm"},
		{"id":"m42","name":"Hard Foam 5cm (200x100)","type":"Foam & Upholstery","unit":"sheet","rate":75,"supplier":"","notes":"High-density firm foam 50mm"},
		{"id":"m43","name":"Foam 10cm Soft/Hard (200x100)","type":"Foam & Upholstery","unit":"sheet","rate":140,"supplier":"","notes":"Deep comfort foam 100mm"},
		{"id":"m44","name":"Dacron 2cm","type":"Foam & Upholstery","unit":"m","rate":8.4,"supplier":"","notes":"Polyester Dacron wadding 20mm"},
		{"id":"m45","name":"Webbing Strips","type":"Foam & Upholstery","unit":"ML","rate":8,"supplier":"","notes":"Elastic jute webbing"},
		{"id":"m46","name":"Misc Consumables","type":"Other","unit":"pack","rate":30,"supplier":"","notes":"General workshop consumables"},
		{"id":"m47","name":"Edge Banding PVC 22mm","type":"Other","unit":"ML","rate":3,"supplier":"","notes":"Iron-on PVC edge banding"},
		{"id":"m48","name":"Packing Material","type":"Other","unit":"M","rate":2.5,"supplier":"","notes":"Stretch wrap, bubble wrap"},
		{"id":"m49","name":"Screws & Fixings","type":"Other","unit":"pack","rate":15,"supplier":"","notes":"Mixed wood screws, dowels"},
		{"id":"m50","name":"Hardner","type":"Paint & Finish","unit":"L","rate":10,"supplier":"","notes":"Two-component hardener catalyst"},
		{"id":"m51","name":"Paint — Lacquer (per litre)","type":"Paint & Finish","unit":"L","rate":40,"supplier":"","notes":"Solvent-based lacquer topcoat"},
		{"id":"m52","name":"Plywood 18mm (Standard)","type":"Wood","unit":"Sheet","rate":170,"supplier":"","notes":"Standard commercial-grade plywood 18mm"},
		{"id":"m53","name":"Backing Veneer","type":"Wood","unit":"sqm","rate":8,"supplier":"","notes":"Economy backing veneer sheet"},
		{"id":"m54","name":"Tufting","type":"Foam & Upholstery","unit":"sqm","rate":70,"supplier":"","notes":"Button tufting labour and material"},
		{"id":"m55","name":"Knobs","type":"Hardware","unit":"nos","rate":25,"supplier":"","notes":"Decorative furniture knobs"},
		{"id":"m56","name":"Soft-Close Side Channels","type":"Hardware","unit":"set","rate":25,"supplier":"","notes":"Lateral soft-close drawer channels"},
	]


def _get_default_products():
	return [
		{"id":"imp1","name":"Gelato Pouf","sku":"XZ-SE-SP-Pou-001","mainCategory":"Seating","subCategory":"Stools & Poufs","category":"Seating","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":40,"dimW":50,"dimD":50,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":70,"materials":[{"id":"rcfdbde82","libId":"m5","description":"Bendy Ply 5mm","qty":0.3,"unit":"Sheet"},{"id":"r6d0ef1b7","libId":"m6","description":"Okume Wood","qty":1,"unit":"cft"},{"id":"r0e2b5b74","libId":"m8","description":"White Oak Veneer Crown","qty":0.5652,"unit":"sqm"}],"upholstery":[{"id":"rccae6826","libId":"m39","description":"Hard Foam 3cm","qty":1,"unit":"Sheet"},{"id":"r5d2819f7","libId":"m34","description":"Fabric","qty":1,"unit":"m"},{"id":"rfb8fd10a","libId":"m44","description":"Dacron 2cm","qty":1,"unit":"m"}],"finishing":[{"id":"rf2e5802d","libId":"m23","description":"Wood Stain","qty":0.03,"unit":"gallon"},{"id":"r40925fc5","libId":"m22","description":"Sealer & Thinner","qty":0.07,"unit":"L"}],"manpower":[{"id":"r127a6cef","description":"Carpentry","type":"Carpentry","hours":4,"rate":15},{"id":"r776589fe","description":"Painting","type":"Painting","hours":5,"rate":15},{"id":"r1218da83","description":"Upholstery","type":"Upholstery","hours":2,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":80},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp2","name":"TV Unit","sku":"XZ-ST-TV-TVU-001","mainCategory":"Storage & Shelving","subCategory":"TV & Entertainment Units","category":"Storage & Shelving","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":55,"dimW":200,"dimD":45,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":70,"materials":[{"id":"r7ba42597","libId":"m3","description":"18mm MDF","qty":2,"unit":"Sheet"},{"id":"r92249da7","libId":"m2","description":"12mm MDF","qty":1,"unit":"Sheet"},{"id":"rbeb312d8","libId":"m6","description":"Okume Wood","qty":2,"unit":"cft"},{"id":"red10afc0","libId":"m28","description":"Soft-Close Hinges","qty":8,"unit":"set"},{"id":"ra755cd55","libId":"m8","description":"White Oak Veneer Crown","qty":16,"unit":"sqm"},{"id":"r673551a8","libId":"m29","description":"Shelf Support Pins","qty":32,"unit":"nos"}],"upholstery":[],"finishing":[{"id":"rea30d973","libId":"m23","description":"Wood Stain","qty":0.661375,"unit":"gallon"},{"id":"r3556eac7","libId":"m22","description":"Sealer & Thinner","qty":2.5,"unit":"L"}],"manpower":[{"id":"r6684023d","description":"Carpentry","type":"Carpentry","hours":36,"rate":15},{"id":"r868c38ad","description":"Painting","type":"Painting","hours":2,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":200},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp3","name":"Archi Chairs","sku":"XZ-SE-CH-DCh-001","mainCategory":"Seating","subCategory":"Chairs","category":"Seating","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":79,"dimW":43,"dimD":38,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":70,"materials":[{"id":"rd8eb3808","libId":"m7","description":"Beech Wood","qty":0.5,"unit":"cft"}],"upholstery":[{"id":"r279c2d21","libId":"m40","description":"Hard Foam 4cm","qty":0.25,"unit":"Sheet"},{"id":"r57e1b941","libId":"m34","description":"Fabric","qty":1,"unit":"m"},{"id":"r4fae4963","libId":"m44","description":"Dacron 2cm","qty":1,"unit":"m"}],"finishing":[{"id":"r2e5e6890","libId":"m23","description":"Wood Stain","qty":0.034,"unit":"gallon"},{"id":"r86951349","libId":"m22","description":"Sealer & Thinner","qty":0.133,"unit":"L"}],"manpower":[{"id":"rc2705c6c","description":"Carpentry","type":"Carpentry","hours":7,"rate":15},{"id":"r43bcc124","description":"Painting","type":"Painting","hours":5,"rate":15},{"id":"r1997ad6f","description":"Upholstery","type":"Upholstery","hours":1,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":80},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp4","name":"Levels","sku":"XZ-TB-CT-Lev-001","mainCategory":"Tables","subCategory":"Coffee Tables","category":"Tables","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":45,"dimW":100,"dimD":60,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":70,"materials":[{"id":"r00b083a2","libId":"m19","description":"Mosaic Tiles","qty":1.25,"unit":"sqm"},{"id":"rfc264b6a","libId":"m2","description":"12mm MDF","qty":1,"unit":"Sheet"},{"id":"r5ae6643f","libId":"m8","description":"White Oak Veneer Crown","qty":3,"unit":"sqm"},{"id":"r102db700","libId":"m3","description":"18mm MDF","qty":1,"unit":"Sheet"}],"upholstery":[],"finishing":[{"id":"rd8b92eb9","libId":"m25","description":"Tile Grouting","qty":0.03,"unit":"gallon"},{"id":"rb0479f1d","libId":"m6","description":"Okume Wood","qty":0.01,"unit":"cft"},{"id":"rd53e7be1","libId":"m26","description":"Sika Bond & Sealer","qty":3,"unit":"nos"},{"id":"rd339c45c","libId":"m27","description":"Marble Polishing","qty":1,"unit":"ml"},{"id":"r3516484c","libId":"m37","description":"Wool Yarn","qty":5,"unit":"pcs"}],"manpower":[{"id":"rd20b865c","description":"Carpentry","type":"Carpentry","hours":4,"rate":15},{"id":"rfacf3621","description":"Painting","type":"Painting","hours":5,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":100},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp5","name":"The Nest","sku":"XZ-SE-SO-Nes-001","mainCategory":"Seating","subCategory":"Sofas","category":"Seating","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":85,"dimW":220,"dimD":95,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":100,"materials":[{"id":"rdfa0a4a6","libId":"m7","description":"Beech Wood","qty":1,"unit":"cft"},{"id":"rcf6f8e31","libId":"m3","description":"18mm MDF","qty":1,"unit":"Sheet"},{"id":"r182e8513","libId":"m2","description":"12mm MDF","qty":1,"unit":"Sheet"},{"id":"rf7bbe83f","libId":"m8","description":"White Oak Veneer Crown","qty":6,"unit":"sqm"}],"upholstery":[{"id":"r71e03eaf","libId":"m41","description":"Medium Foam 5cm","qty":1,"unit":"Sheet"},{"id":"r1e44832b","libId":"m38","description":"Hard Foam 1cm","qty":1,"unit":"Sheet"},{"id":"r7a4fc00d","libId":"m34","description":"Fabric","qty":4,"unit":"m"},{"id":"r8a34b7e2","libId":"m44","description":"Dacron 2cm","qty":4,"unit":"m"}],"finishing":[{"id":"rae83cac4","libId":"m23","description":"Wood Stain","qty":1,"unit":"gallon"},{"id":"r6131c855","libId":"m22","description":"Sealer & Thinner","qty":2,"unit":"L"},{"id":"raa64acd2","libId":"m9","description":"Veneer Power Glue","qty":0.09,"unit":"bag"}],"manpower":[{"id":"r66a7a0b8","description":"Carpentry","type":"Carpentry","hours":14,"rate":15},{"id":"r1f3036d6","description":"Painting","type":"Painting","hours":8,"rate":15},{"id":"r3d10d650","description":"Upholstery","type":"Upholstery","hours":4,"rate":18},{"id":"r46a0ea9f","description":"Veneer Compress","type":"Other","hours":1,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":130},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp6","name":"The Majlis Lounge","sku":"XZ-SE-SO-Maj-001","mainCategory":"Seating","subCategory":"Sofas","category":"Seating","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":80,"dimW":200,"dimD":90,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":25,"profitPct":100,"materials":[],"upholstery":[{"id":"rb4d38d29","libId":"m41","description":"Medium Foam 5cm","qty":1,"unit":"Sheet"},{"id":"r763d3b21","libId":"m38","description":"Hard Foam 1cm","qty":1,"unit":"Sheet"},{"id":"re07c2d55","libId":"m34","description":"Fabric","qty":4,"unit":"m"},{"id":"rd5066fd4","libId":"m44","description":"Dacron 2cm","qty":4,"unit":"m"}],"finishing":[],"manpower":[{"id":"r64113ca1","description":"Upholstery","type":"Upholstery","hours":5,"rate":18}],"machineUsage":[],"misc":{"miscConsumables":82.5},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp7","name":"The Horizon","sku":"XZ-SE-SO-Hor-001","mainCategory":"Seating","subCategory":"Sofas","category":"Seating","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":85,"dimW":300,"dimD":100,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":150,"materials":[{"id":"rb47e5742","libId":"m7","description":"Beech Wood","qty":1,"unit":"cft"},{"id":"rd9ccf7e8","libId":"m3","description":"18mm MDF","qty":1,"unit":"Sheet"},{"id":"r0e44f4cd","libId":"m2","description":"12mm MDF","qty":3,"unit":"Sheet"},{"id":"r9e29f90c","libId":"m8","description":"White Oak Veneer Crown","qty":1,"unit":"sqm"}],"upholstery":[{"id":"r16bd7777","libId":"m41","description":"Medium Foam 5cm","qty":3,"unit":"Sheet"},{"id":"rad796041","libId":"m42","description":"Hard Foam 5cm","qty":3,"unit":"Sheet"},{"id":"r9414cbda","libId":"m34","description":"Fabric","qty":20,"unit":"m"},{"id":"rffc622b2","libId":"m44","description":"Dacron 2cm","qty":20,"unit":"m"}],"finishing":[{"id":"r3a08f89f","libId":"m22","description":"Sealer & Thinner","qty":1,"unit":"L"}],"manpower":[{"id":"r13ebfcc7","description":"Carpentry","type":"Carpentry","hours":5,"rate":18},{"id":"r9c89c3d2","description":"Painting","type":"Painting","hours":2,"rate":15},{"id":"re51e4234","description":"Upholstery","type":"Upholstery","hours":15,"rate":18},{"id":"r3ee92ba3","description":"Veneer Compress","type":"Other","hours":1,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":80},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"imp8","name":"Taj","sku":"XZ-SE-CH-Taj-001","mainCategory":"Seating","subCategory":"Chairs","category":"Seating","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":90,"dimW":70,"dimD":70,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":100,"materials":[{"id":"rd657fe9a","libId":"m3","description":"18mm MDF","qty":2,"unit":"Sheet"},{"id":"r543ab68f","libId":"m8","description":"White Oak Veneer Crown","qty":4,"unit":"sqm"}],"upholstery":[],"finishing":[{"id":"r285f320b","libId":"m23","description":"Wood Stain","qty":0.3,"unit":"gallon"}],"manpower":[{"id":"r4e596fe8","description":"Carpentry","type":"Carpentry","hours":7,"rate":18},{"id":"r1beed8b3","description":"Painting","type":"Painting","hours":5,"rate":18}],"machineUsage":[],"misc":{"miscConsumables":70},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"pv1","name":"Pop TV Unit / Coffee Table","sku":"XZ-PV-TV-001","mainCategory":"Storage & Shelving","subCategory":"TV & Entertainment Units","category":"Storage & Shelving","collection":"Pop Vintage","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":50,"dimW":120,"dimD":45,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":120,"materials":[{"id":"r108be23f","libId":"m3","description":"18mm MDF","qty":2,"unit":"Sheet"},{"id":"r0326f239","libId":"m6","description":"Okume Wood","qty":1,"unit":"cft"},{"id":"r591c2da4","libId":None,"description":"MDF 6mm","qty":1,"unit":"Sheet","rate":45}],"upholstery":[],"finishing":[{"id":"r0de38275","libId":None,"description":"Primer","qty":0.1,"unit":"drum","rate":219},{"id":"r36f2f4e0","libId":None,"description":"Paint (lacquer)","qty":2,"unit":"L","rate":40},{"id":"r512a848f","libId":"m22","description":"Sealer & Thinner","qty":3,"unit":"L"},{"id":"r6c24e98f","libId":None,"description":"Hardner","qty":1.5,"unit":"L","rate":10}],"manpower":[{"id":"r9330f5de","description":"Carpentry","type":"Carpentry","hours":6,"rate":18},{"id":"r3c62b3d1","description":"Painting","type":"Painting","hours":8,"rate":18}],"machineUsage":[],"misc":{"miscConsumables":220},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"pv3","name":"Afro Chair","sku":"XZ-PV-ST-002","mainCategory":"Seating","subCategory":"Chairs","category":"Seating","collection":"Pop Vintage","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":65,"dimW":50,"dimD":50,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":150,"materials":[{"id":"r09b40304","libId":"m2","description":"12mm MDF","qty":1,"unit":"Sheet"},{"id":"r0b28de61","libId":"m6","description":"Okume Wood","qty":2,"unit":"cft"},{"id":"r14f95a67","libId":None,"description":"Plywood 18mm","qty":1,"unit":"Sheet","rate":170}],"upholstery":[{"id":"r57371294","libId":None,"description":"Medium Foam 7cm","qty":10,"unit":"cm","rate":13},{"id":"r87c6f209","libId":None,"description":"Hard Foam 10cm","qty":1,"unit":"cm","rate":15},{"id":"r6ebdb3ac","libId":"m34","description":"Fabric","qty":2,"unit":"m"},{"id":"r7d2da32f","libId":"m44","description":"Dacron 2cm","qty":2,"unit":"m"}],"finishing":[{"id":"r038ef2d9","libId":None,"description":"Primer","qty":0.05,"unit":"drum","rate":219},{"id":"r3adc4120","libId":None,"description":"Paint (lacquer)","qty":1,"unit":"L","rate":40},{"id":"rdd715613","libId":"m22","description":"Sealer & Thinner","qty":1,"unit":"L"},{"id":"rbb794d42","libId":None,"description":"Hardner","qty":1,"unit":"L","rate":10}],"manpower":[{"id":"r19e5fd09","description":"Carpentry","type":"Carpentry","hours":8,"rate":18},{"id":"ra111bfa0","description":"Painting","type":"Painting","hours":5,"rate":18},{"id":"r58d68207","description":"Upholstery","type":"Upholstery","hours":4,"rate":18}],"machineUsage":[],"misc":{"miscConsumables":80},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"pr1","name":"Falls Shelving Unit","sku":"XZ-ST-SH-001","mainCategory":"Storage & Shelving","subCategory":"Open Shelving","category":"Storage & Shelving","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":180,"dimW":100,"dimD":30,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":20,"profitPct":150,"materials":[{"id":"re126faab","libId":"m5","description":"Bendy Ply 5mm","qty":1,"unit":"Sheet"},{"id":"r398a4be3","libId":"m6","description":"Okume Wood","qty":2,"unit":"cft"},{"id":"r31826a7d","libId":None,"description":"MDF 6mm","qty":2,"unit":"Sheet","rate":21}],"upholstery":[],"finishing":[{"id":"r5ef9d80b","libId":None,"description":"Primer","qty":0.2,"unit":"drum","rate":219},{"id":"r434c96da","libId":None,"description":"Paint (drum)","qty":0.03,"unit":"drum","rate":550},{"id":"ra7fc0e92","libId":"m22","description":"Sealer & Thinner","qty":0.5,"unit":"L"}],"manpower":[{"id":"r3f41d6aa","description":"Carpentry","type":"Carpentry","hours":20,"rate":15},{"id":"r4814978d","description":"Painting","type":"Painting","hours":10,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":80},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
		{"id":"pr3","name":"Half-Moon Side Table","sku":"XZ-TB-ST-HM-001","mainCategory":"Tables","subCategory":"Side Tables","category":"Tables","collection":"","notes":"","active":True,"quoteQty":1,"quoteUnit":"Nos","dimH":55,"dimW":60,"dimD":30,"clientDescription":"","care":"","specs":[],"finishes":[],"image":None,"drawingsImage":None,"overheadPct":10,"profitPct":35,"materials":[{"id":"rbd341882","libId":"m2","description":"12mm MDF","qty":0.5,"unit":"Sheet"},{"id":"rfe68b7f0","libId":"m6","description":"Okume Wood","qty":0.25,"unit":"cft"},{"id":"rab75fa7e","libId":None,"description":"Marble - Black Marquina","qty":0.5,"unit":"sqm","rate":150}],"upholstery":[],"finishing":[{"id":"r8902c48b","libId":None,"description":"Paint (drum)","qty":0.01,"unit":"drum","rate":550},{"id":"r799c480f","libId":"m22","description":"Sealer & Thinner","qty":0.5,"unit":"L"},{"id":"rdd1f0fcc","libId":None,"description":"Primer","qty":0.07,"unit":"drum","rate":219}],"manpower":[{"id":"r798be1f3","description":"Carpentry","type":"Carpentry","hours":2,"rate":15},{"id":"r02dc68f9","description":"Painting","type":"Painting","hours":2,"rate":15}],"machineUsage":[],"misc":{"miscConsumables":60},"installation":{"enabled":False,"type":"hourly","hours":0,"rate":None,"flatFee":0,"notes":""},"delivery":{"enabled":False,"flatFee":0,"notes":""}},
	]
