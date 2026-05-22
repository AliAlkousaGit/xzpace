import frappe
from frappe.model.document import Document


class XZProductCostLine(Document):
	def validate(self):
		self.calculate_amount()

	def calculate_amount(self):
		self.amount = (self.quantity or 0) * (self.rate or 0)
