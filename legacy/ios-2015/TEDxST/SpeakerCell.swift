//
//  SpeakerCell.swift
//  Y
//
//  Created by Kris Haamer on 04.06.15.
//  Copyright (c) 2015 HAAM. All rights reserved.
//

import UIKit
import Bolts
import Parse
import ParseUI

class SpeakerCell: PFTableViewCell {
    
    @IBOutlet weak var speakerImageSmall: PFImageView!
    @IBOutlet weak var speakerName: UILabel!
    @IBOutlet weak var talkTitle: UILabel!
    @IBOutlet weak var talkStartTime: UILabel!
    
    var parseObject:PFObject?
    
    override func awakeFromNib() {

        super.awakeFromNib()
    }
 
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
}
