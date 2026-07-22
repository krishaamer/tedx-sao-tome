//
//  BigLabel.swift
//  TEDxST
//
//  Created by Kris Haamer on 10/07/15.
//  Copyright (c) 2015 Kris Haamer. All rights reserved.
//

class BigLabel: UILabel {
    
    override func drawTextInRect(rect: CGRect) {
        let newRect = CGRectInset(rect, 35, 35)
        super.drawTextInRect(newRect)
    }
}

