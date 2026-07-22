//
//  LicenseCell.swift
//  TEDxST
//
//  Created by Kris Haamer on 08.07.15.
//  Copyright © 2015 Kris Haamer. All rights reserved.
//

import UIKit
import Parse
import ParseUI

class LicenseCell: PFTableViewCell {
    
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var license: UILabel!
    
    override func awakeFromNib() {
        
        // doSomething
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
}
