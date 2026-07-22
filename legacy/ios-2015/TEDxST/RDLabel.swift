//
//  RDLabel.swift
//  TEDxST
//
//  Created by Kris Haamer on 07.07.15.
//  Copyright © 2015 Kris Haamer. All rights reserved.
//

class RDLabel: UILabel {
    
    override func drawTextInRect(rect: CGRect) {
        let newRect = CGRectInset(rect, 15, 15)
        super.drawTextInRect(newRect)
    }
}
