
var paypal_products = function() {
    return{
    "text": "PayPal Products",
    "attachments": [
        {
            "fallback": "Web Payments",
            "color": "#3b7bbf",
            "title": "Web Payments",
            "fields": [
                {
                    "title": "PayPal Express Checkout"
                },
                {
                    "title": "PayPal Payments Standard"
                },
                {
                    "title": "PayPal Payments Pro"
                }
            ]
        },
        {
            "fallback": "Compare Solutions",
            "color": "white",
            "title": "Compare Solutions",
            "fields": [
                {
                    "title": "Online Invoicing"
                },
                {
                    "title": "PayPal Online Invoicing"
                }
            ]
        },
        {
            "fallback": "In-Store Payments",
            "color": "#477dc1",
            "title": "In-Store Payments",
            "fields": [
                {
                    "title": "PayPal Here"
                },
                {
                    "title": "Point of Sale (POS) Solutions"
                }
            ]
        },
        {
            "fallback": "Mobile Payments",
            "color": "#7c7c7c",
            "title": "Mobile Payments",
            "fields": [
                {
                    "title": "PayPal Here"
                }
            ]
        },
        {
            "fallback": "Developers",
            "color": "#844cc6",
            "title": "Developers",
            "fields": [
                {
                    "title": "Braintree v.zero"
                },
                {
                    "title": "PayPal Developers"
                },
                {
                    "title": "PayPal Here SDK"
                }
            ]
        },
        {
            "fallback": "Other Products",
            "color": "#4b4ac3",
            "title": "Other Products",
            "fields": [
                {
                    "title": "PayPal Working Capital"
                },
                {
                    "title": "PayPal Credit"
                },
                {
                    "title": "Promotional Financing"
                },
                {
                    "title": "PayPal Business Debit MasterCard"
                },
                {
                    "title": "Digital Goods"
                },
                {
                    "title": "Fundraising"
                },
                {
                    "title": "Mass Payment"
                },
                {
                    "title": "PayFlow Payment Gateway"
                },
                {
                    "title": "Virtual Terminal"
                }
            ]
        },
        {
            "fallback": "Industry Solutions",
            "color": "warning",
            "title": "Industry Solutions",
            "fields": [
                {
                    "title": "Nonprofits"
                },
                {
                    "title": "Education"
                },
                {
                    "title": "Political Campaigns"
                },
                {
                    "title": "Government"
                },
                {
                    "title": "Enterprise"
                }
            ]
        },
        {
            "fallback": "Partner Solutions",
            "color": "#8c3f5a",
            "title": "Partner Solutions",
            "fields": [
                {
                    "title": "Shopping Cart"
                },
                {
                    "title": "3rd-party products and services for your business"
                }
            ]
        }
    ]
}
}

module.exports = paypal_products