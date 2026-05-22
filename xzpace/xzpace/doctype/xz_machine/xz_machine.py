import frappe
from frappe.model.document import Document


class XZMachine(Document):
	def validate(self):
		if self.hourly_rate and self.hourly_rate < 0:
			frappe.throw("Hourly Rate cannot be negative")
		if self.daily_rate and self.daily_rate < 0:
			frappe.throw("Daily Rate cannot be negative")
