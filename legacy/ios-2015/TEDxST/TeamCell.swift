//
//  TeamCell.swift
//  TEDxST
//
//  Created by Kris Haamer on 04.07.15.
//  Copyright © 2015 HAAM. All rights reserved.
//

import UIKit
import Parse
import ParseUI

class TeamCell: PFTableViewCell {
    
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var role: UILabel!
    @IBOutlet weak var desc: UILabel!
    
    var parseObject:PFObject?
    
    override func awakeFromNib() {
        
        // doSomething
    }
    
    override func layoutMarginsDidChange() {
        
        // doSomething
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
}
