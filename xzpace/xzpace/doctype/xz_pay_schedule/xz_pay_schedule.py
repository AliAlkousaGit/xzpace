import frappe
from frappe.model.document import Document
from frappe.utils import flt


class XZPaySchedule(Document):
	def validate(self):
		self.validate_total_percentage()

	def validate_total_percentage(self):
		if not self.milestones:
			return
		total = sum(flt(m.percentage or 0) for m in self.milestones)
		if total != 100:
			frappe.throw(
				f"Total milestone percentage must be 100%. Currently it is {total}%",
				title="Invalid Milestone Percentages"
			)
