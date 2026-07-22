//
//  GuestCell.swift
//  TEDxST
//
//  Created by Kris Haamer on 06.06.15.
//  Copyright (c) 2015 HAAM. All rights reserved.
//

import UIKit
import Parse
import ParseUI

class GuestCell: PFTableViewCell {
    
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var company: UILabel!
    @IBOutlet weak var message: UILabel!
    
    var parseObject:PFObject?
    
    override func awakeFromNib() {
        // do nothing
    }
    
    override func layoutMarginsDidChange() {
      // do nothing
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
}
