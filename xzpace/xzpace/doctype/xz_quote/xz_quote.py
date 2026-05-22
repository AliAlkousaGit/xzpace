import frappe
from frappe.model.document import Document
from frappe.utils import flt, rounded


class XZQuote(Document):
	def validate(self):
		self.calculate_totals()

	def calculate_totals(self):
		subtotal = 0
		total_discount = 0

		for item in self.items:
			item.calculate_amounts()
			subtotal += flt(item.amount)
			total_discount += flt(item.discount_amount) * flt(item.quantity)

		self.subtotal = subtotal
		self.total_discount = total_discount

		net = subtotal - total_discount
		tax_pct = flt(self.tax_and_charges or 0)
		self.tax_amount = (net * tax_pct) / 100.0
		self.grand_total = net + self.tax_amount

		self.rounded_total = rounded(self.grand_total)
		self.rounding_adjustment = self.rounded_total - self.grand_total

	def on_submit(self):
		self.status = "Submitted"

	def on_cancel(self):
		self.status = "Cancelled"
