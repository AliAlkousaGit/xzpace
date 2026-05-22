from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

setup(
    name="xzpace",
    version="0.0.2",
    description="XZPACE Pricing Dashboard - Custom ERPNext App",
    author="XZPACE",
    author_email="info@xzpace.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
)
