import frappe
from frappe.model.document import Document


class XZMaterial(Document):
	def validate(self):
		if self.unit_cost and self.unit_cost < 0:
			frappe.throw("Unit Cost cannot be negative")
