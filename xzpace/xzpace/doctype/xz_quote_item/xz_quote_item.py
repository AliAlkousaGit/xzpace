import frappe
from frappe.model.document import Document
from frappe.utils import flt


class XZQuoteItem(Document):
	def validate(self):
		self.calculate_amounts()

	def calculate_amounts(self):
		qty = flt(self.quantity or 0)
		price = flt(self.unit_price or 0)
		disc_pct = flt(self.discount_percent or 0)

		self.discount_amount = (price * disc_pct) / 100.0
		self.net_price = price - self.discount_amount
		self.amount = qty * self.net_price
