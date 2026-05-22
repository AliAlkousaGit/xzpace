import frappe
from frappe.model.document import Document
from frappe.utils import flt


class XZProduct(Document):
	def validate(self):
		self.calculate_total_cost()

	def calculate_total_cost(self):
		total = 0
		for line in self.cost_lines:
			line.calculate_amount()
			total += flt(line.amount)
		self.total_cost = total
		if self.selling_price and total > 0:
			self.margin_percent = ((flt(self.selling_price) - total) / flt(self.selling_price)) * 100
		else:
			self.margin_percent = 0
